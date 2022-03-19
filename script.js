//Setting all content data
const federalStatesNames = ['Bavaria', 'Baden-Wuerttemberg', 'Hesse', 'Thuringia', 'Saxony']

const federalStatesColors=['#4398d0', '#F6DF4D', '#de0003', '#e40003', '#146d2a']

const passengerNumbers =
{
    2010: [1221.1, 1128.3, 1548.6, 157.2, 443],
    2011: [1261.7, 1146.9, 1636.5, 158.4, 446.2],
    2012: [1273.60, 1151.40, 1635.80, 152.80, 449.40],
    2013: [1270.60, 1145.30, 1965.20, 160.40, 455.60],
    2014: [1290.30, 1167.40, 1991.80, 155.60, 446],
    2015: [1276.20, 1164.30, 1973.70, 155.30, 429.70],
    2016: [1329.40, 1193.20, 2007.70, 162.90, 445.70],
    2017: [1321.10, 1181.90, 2044.50, 165.10, 453.50],
    2018: [1326.90, 1166.60, 2077.50, 166.80, 456.20],
    2019: [1339.80, 1160.10, 2107.20, 164.90, 448.20],
    2020: [906.10, 810.60, 1296.70, 123.40, 334]
}

const years=Object.keys(passengerNumbers).map(item => parseInt(item))
const minimumYear=Math.min(...years)
const maximumYear=Math.max(...years);



//Saving the current state
let currentYear=2010



//Create and initialize the UI elements
const currentYearParagraph=document.getElementById("currentYearParagraph")
currentYearParagraph.innerText=currentYear.toString()

Chart.defaults.font.family='Raleway-Medium';
Chart.registry.getPlugin('tooltip').positioners.mouse = (elements, eventPosition) => {return {x: eventPosition.x, y: eventPosition.y}};
const diagramCanvas=document.getElementById('diagramCanvas');
const diagramChart = new Chart(
    diagramCanvas,
    {
        type: 'bar',
        data:
        {
            labels: federalStatesNames,
            datasets:
                [{
                    backgroundColor: federalStatesColors,
                    data: passengerNumbers[2010],
                }]
        },
        options:
        {
            borderRadius:
            {
                topLeft: 10,
                topRight: 10
            },
            scales:
            {
                y:
                {
                    max: 2200,
                    min: 0,
                    title:
                    {
                        display: true,
                        text: "In millions"
                    }
                }
            },
            plugins:
            {
                legend:
                {
                    display: false
                },
                tooltip:
                {
                    enabled: true,
                    position: "mouse",
                    displayColors: false,
                    callbacks:
                    {
                        title: () => ""
                    }
                }
            }
        }
    }
);

const currentYearInputRange=document.getElementById("currentYearInputRange")
currentYearInputRange.min=minimumYear;
currentYearInputRange.max=maximumYear;



//Function to update the values
function changeYear(newYear)
{
    if(typeof newYear !== "number"|| newYear===currentYear || newYear>maximumYear || newYear<minimumYear) return;

    currentYear=newYear;

    currentYearInputRange.value=currentYear;
    if(currentYear===2020) currentYearInputRange.style.setProperty('--SliderPicture', 'url(./resources/images/coronavirus.png)')
    else currentYearInputRange.style.setProperty('--SliderPicture', 'url(./resources/images/bus_stop_sign.png)')

    currentYearParagraph.innerText=currentYear.toString();

    diagramChart.data.datasets[0].data=passengerNumbers[currentYear]
    diagramChart.update();
}