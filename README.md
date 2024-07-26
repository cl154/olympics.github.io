# Narrative Visualization of Olympic Medals Distribution
CS416 - Narrative Visualization project by Clement Lin (cl154@ililinois.edu)

This report outlines the key elements of the narrative visualization of Olympic medals distribution, highlighting how the design and implementation meet the requirements of effective narrative visualization. The URL for the narrative visualization is [https://cl154.github.io/olympics.github.io/](https://cl154.github.io/olympics.github.io/). The data sources used in this visualization include the Olympic medals dataset, [olympic_medals.csv](https://www.kaggle.com/datasets/piterfm/olympic-games-medals-19862018?resource=download), and the geographic data, [countries.geo.json](https://github.com/johan/world.geo.json/blob/master/countries.geo.json).

## Data Sources
- [Olympic medals dataset (olympic_medals.csv)](https://www.kaggle.com/datasets/piterfm/olympic-games-medals-19862018?resource=download)
- [Geographic data (countries.geo.json)](https://github.com/johan/world.geo.json/blob/master/countries.geo.json)

## Messaging

The primary message communicated by this narrative visualization is the distribution of Olympic medals—gold, silver, and bronze—across various countries over the years. The visualization aims to illustrate the geographic distribution of Olympic success and highlight how factors such as population size, economic prosperity, and the role of the host country influence medal winnings. By exploring this visualization, viewers can gain insights into historical trends and patterns in Olympic medal distribution from 1896 to 2022.

## Narrative Structure

This narrative visualization follows the "interactive slideshow" structure. This structure allows user exploration at each step of the story, enabling viewers to engage with the data and discover insights at their own pace. The visualization begins with an overview of the Olympic Games and then guides the viewer through different aspects of medal distribution. At each step, users can explore detailed data for each type of medal—gold, silver, and bronze—by interacting with the visual elements, such as hovering over circles to see detailed information in tooltips.

## Visual Structure

Each scene in the narrative visualization uses a consistent visual structure to ensure clarity and ease of navigation:

- **Map Visualization**: A world map is used as the primary visual structure to display the distribution of medals geographically. This map is rendered using D3's geoNaturalEarth1 projection.
- **Circles for Medals**: Medals are represented by circles plotted on the map, with their size and color corresponding to the number of medals won. Different color scales are used for gold, silver, and bronze medals.
- **Text Annotations**: Each scene includes text elements that display the current year and details of the medals won by different countries. These annotations are placed consistently above the map.
- **Interactive Elements**: Tooltips provide detailed information when users hover over the circles, enhancing user interaction and engagement with the data.

This visual structure helps viewers focus on important data points and facilitates transitions between scenes by maintaining visual consistency.

## Scenes

The narrative visualization consists of multiple scenes, each highlighting a different aspect of Olympic medal distribution:

- **Introduction Scene**: Provides an overview of the Olympic Games and the purpose of the visualization.
- **Gold Medal Scene**: Displays the distribution of gold medals across countries from 1896 to 2022, with circles representing the number of gold medals won.
- **Silver Medal Scene**: Shows the distribution of silver medals in a similar manner.
- **Bronze Medal Scene**: Illustrates the distribution of bronze medals using the same visual approach.

The scenes are ordered chronologically, with each scene transitioning to the next after a short interval. This ordering helps convey the historical progression of Olympic success across different countries.

## Annotations

Annotations in the visualization include text elements that display the current year and medal details. These annotations follow a consistent template:

- **Year Text**: Positioned at the top center of the map, displaying the current year in a large, bold font.
- **Details Text**: Placed below the year text, showing a summary of medals won by different countries in the current year. (tooltips)

These annotations support the messaging by highlighting key data points and providing context for the visualized data. The detailed text changes dynamically within each scene to reflect the data for the current year.

## Parameters

The main parameters of the narrative visualization are:

- **Year**: The current year being visualized, which changes at regular intervals to show the progression over time.
- **Medal Data**: The dataset containing information about medals won by each country, categorized by medal type and year.

These parameters define the state of the visualization and control the data displayed in each scene. The year parameter is particularly important for transitioning between scenes and updating the visual elements.

## Triggers

Triggers in the visualization are event listeners that connect user actions to changes in the state:

- **Hover Event**: When a user hovers over a circle, a tooltip is triggered to display detailed information about the medals won by the corresponding country.
- **Interval Timer**: An interval timer triggers the transition between years, updating the map and annotations to reflect the data for the new year.

These triggers enhance user interaction and ensure that the visualization responds dynamically to user inputs, providing an engaging and informative experience.
