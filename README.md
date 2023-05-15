# Word Frequency Counter

This is a React application that counts the frequency of words in a text file and displays the top 20 most occurring words in a histogram using the ApexCharts library. The application also provides the functionality to export the word frequency data to a CSV file.

## Hosted Link
You can try out the app at 
```
https://dynamic-chart.vercel.app/
```

## Dependencies

- apexcharts: "^3.40.0"
- axios: "^1.4.0"
- react: "^18.2.0"
- react-apexcharts: "^1.4.0"
- react-csv: "^2.2.2"

## Installation

To install the dependencies, run the following command in the terminal:

```
npm install
```

## Usage

To start the application, run the following command in the terminal:

```
npm start
```

The application will start on `http://localhost:3000/`.

You can also access a live version of the app deployed on Vercel at https://dynamic-chart.vercel.app/

## How It Works

1. When the application starts, it makes an HTTP GET request to fetch the text file from `https://www.terriblytinytales.com/test.txt`.
2. The text is stored in the `str` state variable.
3. When the user clicks the "Submit" button, the `myFun` function is called.
4. The `myFun` function first extracts the words from the text using a regular expression and stores them in the `words` state variable.
5. The `countWords` function counts the frequency of each word and returns an array of sorted word-frequency pairs.
6. The `myFun` function extracts the top 20 word-frequency pairs from the sorted array and stores them in the `freq` and `words` state variables.
7. The `isGraph` state variable is set to `true`, which causes the histogram to be displayed.
8. The `csvData` array is created and populated with the top 20 word-frequency pairs.
9. The `csvData` array is passed to the `CSVLink` component, which creates a download link for a CSV file containing the word frequency data.
10. The histogram is displayed using the `Chart` component from the ApexCharts library. The `data` object contains the series data and the configuration options for the histogram.

## Conclusion

This application demonstrates how to use React and ApexCharts to create a word frequency counter and display the results in a histogram. The application also provides the functionality to export the word frequency data to a CSV file.