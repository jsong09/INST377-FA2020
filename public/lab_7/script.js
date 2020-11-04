function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    
    title:{
      text:"Places To Eat Out In Future"
    },
    axisX:{
      interval: 2
    },
    axisY2:{
      interlacedColor: "rgba(0,0,0,.2)",
      gridColor: "rgba(194,94,194,.1)",
      title: "Restaurants By Category"
    },
    data: [{
      type: "bar",
      name: "companies",
      axisYType: "secondary",
      color: "#ffc4b5",
      dataPoints: [
        { y: 1, label: "Ice Cream" },
        { y: 1, label: "Carry-out" },
        { y: 1, label: "Convenience Store" },
        { y: 1, label: "Fast Food - Chain" },
        { y: 1, label: "Fast Food - Local" },
        { y: 1, label: "Seafood" },
        { y: 1, label: "Restaurant" },
        { y: 1, label: "Grocery Store- Medium" },
        { y: 1, label: "Gas Station Store" },
        { y: 1, label: "Coffee Shop" },
        { y: 1, label: "N/A" },
        { y: 1, label: "Grocery Store - Large" },
        { y: 1, label: "College/University" },
        { y: 1, label: "Fast Food" },
        { y: 1, label: "Public School" },
        { y: 1, label: "Hotel" },
        { y: 1, label: "Grocery Store" },
        { y: 1, label: "Bakery/Catering" },
        { y: 1, label: "Health Care Facility" },
        { y: 1, label: "Bar/Tavern/Lounge" },
        { y: 1, label: "Dollar Store" },
        { y: 1, label: "Bakery" },
        { y: 1, label: "Private School" },
        { y: 1, label: "Membership Warehouse" },
        { y: 1, label: "Stadium/Amusement Park" },
        { y: 1, label: "Limited Service" },
        { y: 1, label: "Casino" },
        { y: 1, label: "Church/Temple/Mosque" },
        { y: 1, label: "Catering Only" },
        { y: 1, label: "Banquet Hall/Ballroom" },
        { y: 1, label: "Diet/Nutrition Site" },
        { y: 1, label: "Fire/Community Hall" },
        { y: 1, label: "Cafeteria" },
        { y: 1, label: "Group Home" },
        { y: 1, label: "Meat/Poultry Market" },
        { y: 1, label: "@Fast Food" },
        { y: 1, label: "Institution" },
        { y: 1, label: "Snack Bar/Concession Stand" },
        { y: 1, label: "Multiple Facilities" },
        { y: 1, label: "Pre-Packaged Only" },

      ]
    }]
  });
  chart.render();
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  console.log(json);
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
      dataPoints: data
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support

  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  console.log(json);
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