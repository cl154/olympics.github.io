document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container')
  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const width = container.clientWidth - margin.left - margin.right
  const height = container.clientHeight - margin.top - margin.bottom

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const projection = d3
    .geoNaturalEarth1()
    .scale(width / 6.5)
    .translate([width / 2, height / 2])
  const path = d3.geoPath().projection(projection)

  const tooltip = d3.select('#tooltip')

  d3.json('data/countries.geojson').then(function (geoData) {
    const geoCountryIds = geoData.features.map((f) => f.id)

    svg
      .selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', '#ccc')
      .attr('stroke', '#333')

    const yearText = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')

    const detailsText = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')

    d3.csv('data/medals.csv').then(function (data) {
      const csvCountryCodes = [
        ...new Set(data.map((d) => d.country_3_letter_code)),
      ]

      const medalData = d3.rollups(
        data,
        (v) => v.length,
        (d) => d.country_3_letter_code,
        (d) => d.medal_type,
        (d) => d.slug_game
      )

      const maxMedals = 60

      const color = d3
        .scaleLinear()
        .domain([0, maxMedals])
        .range(['#FFFFE0', '#FF4500'])

      let year = 1896
      const interval = setInterval(() => {
        if (year > 2022) {
          clearInterval(interval)
          return
        }
        updateMap(year)
        year += 4
      }, 1000)

      function updateMap(year) {
        const yearStr = year.toString()
        const yearData = []

        medalData.forEach((country) => {
          const countryCode = country[0]
          const medalTypes = country[1]

          medalTypes.forEach((type) => {
            const medalType = type[0]
            const years = type[1]

            let totalMedals = 0

            years.forEach((y) => {
              const [gameYear, count] = y
              if (gameYear.includes(yearStr) && medalType === 'GOLD') {
                totalMedals += count
              }
            })

            if (totalMedals > 0) {
              yearData.push({
                countryCode,
                medals: totalMedals,
              })
            }
          })
        })

        yearText.text(`Year: ${year}`)

        const details = yearData
          .map((d) => `${d.countryCode}: ${d.medals} medals`)
          .join(', ')
        detailsText.text(details)

        const circles = svg
          .selectAll('circle')
          .data(yearData, (d) => d.countryCode)

        circles
          .attr('cx', (d) => {
            const country = geoData.features.find((f) => f.id === d.countryCode)
            if (country) {
              const coords = projection(d3.geoCentroid(country))
              return coords[0]
            }
            return -999
          })
          .attr('cy', (d) => {
            const country = geoData.features.find((f) => f.id === d.countryCode)
            if (country) {
              const coords = projection(d3.geoCentroid(country))
              return coords[1]
            }
            return -999
          })
          .attr('r', (d) => Math.sqrt(d.medals) * 7)
          .attr('fill', (d) => color(d.medals))
          .on('mouseover', (event, d) => {
            const country = geoData.features.find((f) => f.id === d.countryCode)
            if (country) {
              const coords = projection(d3.geoCentroid(country))
              tooltip
                .style('left', `${coords[0] + margin.left}px`)
                .style('top', `${coords[1] + margin.top}px`)
                .style('visibility', 'visible')
                .html(`${d.countryCode}: ${d.medals} gold medals`)
            }
          })
          .on('mouseout', () => {
            tooltip.style('visibility', 'hidden')
          })

        circles
          .enter()
          .append('circle')
          .attr('cx', (d) => {
            const country = geoData.features.find((f) => f.id === d.countryCode)
            if (country) {
              const coords = projection(d3.geoCentroid(country))
              return coords[0]
            }
            return -999
          })
          .attr('cy', (d) => {
            const country = geoData.features.find((f) => f.id === d.countryCode)
            if (country) {
              const coords = projection(d3.geoCentroid(country))
              return coords[1]
            }
            return -999
          })
          .attr('r', (d) => Math.sqrt(d.medals) * 7)
          .attr('fill', (d) => color(d.medals))
          .on('mouseover', (event, d) => {
            const country = geoData.features.find((f) => f.id === d.countryCode)
            if (country) {
              const coords = projection(d3.geoCentroid(country))
              tooltip
                .style('left', `${coords[0] + margin.left}px`)
                .style('top', `${coords[1] + margin.top}px`)
                .style('visibility', 'visible')
                .html(`${d.countryCode}: ${d.medals} gold medals`)
            }
          })
          .on('mouseout', () => {
            tooltip.style('visibility', 'hidden')
          })

        circles.exit().remove()
      }

      const legendHeight = 200
      const legendWidth = 20

      const legendSvg = svg
        .append('g')
        .attr('class', 'legend')
        .attr(
          'transform',
          `translate(${width - 40}, ${height - legendHeight - 30})`
        )

      const legendScale = d3
        .scaleLinear()
        .domain([0, maxMedals])
        .range([legendHeight, 0])

      const legendAxis = d3
        .axisRight(legendScale)
        .ticks(6)
        .tickSize(6)
        .tickPadding(8)

      const defs = svg.append('defs')

      const linearGradient = defs
        .append('linearGradient')
        .attr('id', 'linear-gradient')
        .attr('x1', '0%')
        .attr('y1', '100%')
        .attr('x2', '0%')
        .attr('y2', '0%')

      linearGradient
        .selectAll('stop')
        .data(
          color.ticks().map((t, i, n) => ({
            offset: `${(100 * i) / n.length}%`,
            color: color(t),
          }))
        )
        .enter()
        .append('stop')
        .attr('offset', (d) => d.offset)
        .attr('stop-color', (d) => d.color)

      legendSvg
        .append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#linear-gradient)')

      legendSvg
        .append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${legendWidth}, 0)`)
        .call(legendAxis)
    })
  })
})
