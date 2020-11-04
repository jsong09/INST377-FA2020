function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const categoryCount = new Map();
  let i;
  
  for(i = 0; i < restaurantList.length; i++) {
    if(categoryCount.has(restaurantList[i].category)) {
      categoryCount.set(categoryCount.get(restaurantList[i].category), categoryCount.get(restaurantList[i].category)+1);
    } else {
      categoryCount.set(restaurantList[i].category, 1);
    }
  }

  return categoryCount
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title:{
      text:"Places to Eat Out In Future"
    },
    axisX:{
      interval: 1
    },
    axisY2:{
      interlacedColor: "rgba(1,77,101,.2)",
      gridColor: "rgba(1,77,101,.1)",
      title: "Restaurants by Category"
    },
    data: [{
      type: "bar",
      name: "companies",
      axisYType: "secondary",
      color: "#014D65",
      dataPoints: [
        reorganizedData
      ]
    }]
  });

  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
    "#f7c9be",
    "#c4c4c4",
    "#121212"
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Color Set 1'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Color Set 2',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: [{
        startValue: 40,
        endValue: 50,
        color: 'red',
        type: 'zigzag'
      }, 
      {
        startValue: 85,
        endValue: 100,
        color: 'blue',
        type: 'zigzag'
      }, 
      {
        startValue: 140,
        endValue: 175,
        color: 'green',
        type: 'zigzag'
      }
      ]} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});