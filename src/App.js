import './App.css';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";

function App() {
  const [dataFetched, setDataFetched] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [freqArr, setFreqArr] = useState([]);
  const [csvFile, setCsvFile] = useState([]);
  const [isGraph, setIsGraph] = useState(false);

  const fileName = "chartData.csv";

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      setDataFetched(response.data);
    }
    getData();
  })

  const countWords = (wordArr) => {
    const frequency = {};
    for (let i = 0; i < wordArr.length; i++) {
      if (frequency[wordArr[i]]) {
        frequency[wordArr[i]]++;
      }
      else {
        frequency[wordArr[i]] = 1;
      }
    }
    const sortedArray = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => `${word}: ${count}`);
    return sortedArray;
  };

  const genrateChart = () => {
    let wordArr = dataFetched.match(/[a-zA-Z]+/g);
    const sortedFrequencyArray = countWords(wordArr);
    const csvData = [
      ["Words", "Frequency"]
    ];
    var w = [], f = [];
    for (let i = 0; i < 20; i++) {
      const tempArr = sortedFrequencyArray[i].split(':');
      w.push(tempArr[0]);
      f.push(parseInt(tempArr[1]));
      csvData.push([tempArr[0], tempArr[1]]);
    }
    setFreqArr(f);
    setWordArr(w);
    setIsGraph(true);
    setCsvFile(csvData);
  }

  var data = {
    series: [
      {
        name: "Frequency",
        data: freqArr,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        },
      },
      title: {
        text: "Histogram",
      },

      subtitle: {
        text: "Frequency of occurrence of word",

      },
      dataLabels: { enabled: false },
      plotOptions: {
        bar: {
          columnWidth: "98%",
          dataLabels: {
            position: 'top',
          },
        }
      },
     
      xaxis: {
        categories: wordArr,
        title: {
          text: "Words",
        },
      },

      yaxis: {
        title: {
          text: "Frequency of Words",
        },
      }
    }
  }

  return (
    <>
      {
        isGraph === false ?
          (<div className='home'>
            <button className='button-19' onClick={genrateChart}>Submit</button>
          </div>) :
          (<div className='chart'>
            <button className="button-3">
              <CSVLink data={csvFile} filename={fileName} style={{textDecoration:"none",color:"white"}} className="csv-tag">Export</CSVLink>
            </button>
            <Chart
              type="bar"
              width="100%"
              height={600}
              series={data.series}
              options={data.options} />

          </div>)
      }
    </>
  );
}

export default App;
