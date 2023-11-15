/**
 * The Main page of the Continuity Compass v0.1 application.
 * The general layout of the page is created and rendered here with the use of Tailwind CSS, NextJS, and React.
 * Uses the LeonComponet, Tab Toggle, GradientBackground component to add style and interactiviy.
 * Utlizes MUI barchart, usePDF, use Media Query
 *
 */

'use client';

import react, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

//Importing UI components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';

//Importing design components
import GradientBackground from '../components/GradientBackground';
import LeonComponent from '@/components/LeonComponent';
import TabToggle from '@/components/TabToggle';

//Imoorting MUI chart, react-pdf, media-query, axios, isURL, React-Loader
import { BarChart } from '@mui/x-charts/BarChart';
import { usePDF } from 'react-to-pdf';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import isUrl from 'is-url';
import { ThreeDots } from  'react-loader-spinner'

//Main Page
export default function Home() {

  /**
   * The React State Hook to preserve loading state
   *
   * @param loading The loading state
   * @function setLoading Sets the loading state
   */
  const [loading, setLoading] = useState(false);

  /**
   * The React State Hook to preserve error state
   *
   * @param error The error state
   * @function setError Sets the error state
   */
  const [error, setError] = useState(null);

  /**
   * The React State Hook to preserve continuity table visibility
   *
   * @param continuityTableVisible The continuity table visibility state
   * @function setContinuityTableVisible Sets the continuity table visibility
   */
  const [continuityTableVisible, setContinuityTableVisible] = useState(false);

  /**
   * The React State Hook to preserve data
   *
   * @param data The data state
   * @function setData Sets the data state
   */
  const [data, setData] = useState(null);

  /**
   * The React State Hook to preserve visibility of the Chart
   *
   * @param isBlackBoxVisible The visibility state of the Chart
   * @function setBlackBoxVisible Sets the visibility for the Chart
   */
  const [isBlackBoxVisible, setBlackBoxVisible] = useState(false);

  /**
   * The React State Hook to preserve active tab
   *
   * @param activeTab The active tab state
   * @function setActiveTab Sets the active tab
   */
  const [activeTab, setActiveTab] = useState('accessibility');

  /**
   * The React State Hook to preserve user URL input
   *
   * @param url The user URL input state
   * @function setUrl Sets the user URL input
   */
  const [url, setUrl] = useState('');

  /**
   * The React State Hook to preserve submission state
   *
   * @param submitted The submission state
   * @function setSubmitted Sets the submission state
   */
  const [submitted, setSubmitted] = useState(false);

  /**
   * The React State Hook to preserve table visibility
   *
   * @param tableVisible The table visibility state
   * @function setTableVisible Sets the table visibility
   */
  const [tableVisible, setTableVisible] = useState(false);

  /**
   * The React State Hook to preserve LeonComponent load state
   *
   * @param leonLoaded The LeonComponent load state
   * @function setLeonLoaded Sets the LeonComponent load state
   */
  const [leonLoaded, setLeonLoaded] = useState(false);

  /**
   * The React State Hook to preserve readability table visibility
   *
   * @param readabilityTableVisible The readability table visibility state
   * @function setReadabilityTableVisible Sets the readability table visibility
   */
  const [readabilityTableVisible, setReadabilityTableVisible] = useState(false);

  /**
   * The React State Hook to preserve accessibility table visibility
   *
   * @param accessibilityTableVisible The accessibility table visibility state
   * @function setAccessibilityTableVisible Sets the accessibility table visibility
   */
  const [accessibilityTableVisible, setAccessibilityTableVisible] =
    useState(false);

  //using usePDF hook to export the specified div
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

//   //add mobile responsiveness
//   const matches = useMediaQuery('(min-width:600px)');

  //use useSpring hook to add translate animation
  const props = useSpring({
    opacity: leonLoaded ? 1 : 0,
    transform: leonLoaded ? 'translateY(0)' : 'translateY(-50px)',
  });
  //let searchbar to wait for the leon component to finish its animation.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeonLoaded(true);
    }, 1800); // assuming LeonComponent takes 2 seconds to load
    return () => clearTimeout(timer);
  }, []);

  //listens to the submit event and shows the table when the url is submitted.
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when data fetching starts

    if (!isUrl(url)) {
      setError('Please enter a valid URL.');
      setLoading(false); 
      return;
    }

    setError(null); // clear any previous error

    const fetchData = () => {
      axios
        .post('http://localhost:8000/', {
          url: url,
        })
        .then((response) => {
          setData(response.data);
          setTableVisible(true);
          setActiveTab('accessibility');
          setAccessibilityTableVisible(true); // show accessibility table
          setReadabilityTableVisible(false); // hide readability table
          setContinuityTableVisible(false); // hide readability table
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
          setError('An error occurred while fetching data.');
        })
        .finally(() => {
            setLoading(false); // Set loading to false when data fetching completes
        });
    };
    setSubmitted(true);
    fetchData();
  };

  //toggle readability Tab
  const handleReadabilityTabClick = () => {
    setActiveTab('readability');
    setReadabilityTableVisible(true);
    setAccessibilityTableVisible(false);
    setContinuityTableVisible(false);
  };

  //toggle accessibility Tab
  const handleAccessibilityTabClick = () => {
    setActiveTab('accessibility');
    setAccessibilityTableVisible(true);
    setReadabilityTableVisible(false);
    setContinuityTableVisible(false);
  };

  const handleContinuityTabClick = () => {
    setActiveTab('continuity');
    setContinuityTableVisible(true);
    setReadabilityTableVisible(false);
    setAccessibilityTableVisible(false);
  };

  //displays the chart
  const handleRunReportClick = () => {
    setBlackBoxVisible(true);
  };

  return (
    <GradientBackground>
      {/* Uses Flex to center the items and display them as column */}
      <div className="flex items-center justify-center flex-col">
        <LeonComponent />
        {/* Search bar gets loaded when the leon component is loaded*/}
        {leonLoaded && (
          <animated.div style={props}>
            {/* Search bar */}
            <Card className="mx-10 my-10 w-80.8125rem h-54.3125rem flex-shrink-0 rounded-0.9375rem bg-black shadow-2xl text-white">
              <div className="flex items-center justify-center p-2 rounded-md min-w-[300px] sm:min-w-[750px]">
                <svg
                  className=" text-white w-6 h-6 mr-2"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <form
                  onSubmit={handleSubmit}
                  className="flex-grow flex items-center"
                >
                  <Input
                    className="bg-black bg-opacity-50 text-[#33ff33] text-lg border-none focus:outline-none flex-1 mx-2 transition-all duration-500 ease-in-out transform placeholder-green-500 focus:placeholder-transparent"
                    placeholder="https://www.enterurl.com/"
                    type="search"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                  />
                  <Button
                    className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {loading && <div className="flex items-center justify-center"><ThreeDots 
height="80" 
width="80" 
radius="9"
color="#FFFFFF" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 /></div>}
              {/* renders table when the url is submitted and initially show accessibility table*/}
              {submitted && tableVisible && (
                <CardContent>
                  {accessibilityTableVisible && (
                    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '700px' }}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>URL</TableHead>
                            <TableHead>Total Non-Text Content</TableHead>
                            <TableHead>Total ARIA Non-Text Content</TableHead>
                            <TableHead>Element Counts</TableHead>
                            <TableHead>iframe</TableHead>
                            <TableHead>img</TableHead>
                            <TableHead>button</TableHead>
                            {/* <TableHead>Alt Attr On Img Total</TableHead>
                            <TableHead>Img Elements</TableHead> */}
                          </TableRow>
                        </TableHeader>
                        {/* accessibilityData */}
                        <TableBody>
  {data && (
    <TableRow>
      <TableCell className="font-medium">
        {data.AccessibilityData.URL}
      </TableCell>
      <TableCell>{data.AccessibilityData.TotalNonTextContent}</TableCell>
      <TableCell>{data.AccessibilityData.TotalARIANonTextContent}</TableCell>
      <TableCell>
        {data.AccessibilityData.ElementCounts.iframe}
      </TableCell>
      <TableCell>
        {data.AccessibilityData.ElementCounts.img}
      </TableCell>
      <TableCell>
        {data.AccessibilityData.ElementCounts.button}
      </TableCell>
    </TableRow>
  )}
</TableBody>
                      </Table>
                    </div>
                  )}
                  {/* when readability button is toggled, shows readability table */}
                  {readabilityTableVisible && (
                    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '700px' }}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                          <TableHead>URL</TableHead>
                          <TableHead>Header</TableHead>
                          <TableHead>Total Words</TableHead>
                            <TableHead>Total Sentences</TableHead>
                            <TableHead>Total Syllable</TableHead>
                            <TableHead>Flesch Reading Ease</TableHead>
                            <TableHead>Flesch Grade Level</TableHead>
                          </TableRow>
                        </TableHeader>
                        {/* readability Data */}
                        <TableBody>
                        {data &&
                            data.FleschData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                  {item.URL}
                                </TableCell>
                                <TableCell>
                                  {item.Header}
                                  </TableCell>
                              <TableCell>
                                  {item.TotalWords}
                                </TableCell>
                            
                                <TableCell>{item.TotalSentences}</TableCell>
                                <TableCell>{item.TotalSyllables}</TableCell>
                                <TableCell>{item.FleschReadingEase}</TableCell>
                                <TableCell>{item.FleschGradeLevel}</TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {/* when continuity button is toggled, shows continuity table */}
                  {continuityTableVisible && (
                    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '700px' }}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>URL</TableHead>
                            <TableHead>TotalHTMLElements</TableHead>
                            <TableHead>TotalCSSElements</TableHead>
                            <TableHead>USWDSPresent</TableHead>
                            <TableHead>USWDSTotal</TableHead>
                            <TableHead>PageDepth</TableHead>
                            <TableHead>USWDSPercent</TableHead>
                          </TableRow>
                        </TableHeader>
                        {/* Continuity Data */}
                        <TableBody>
                          {data && (
                            <TableRow>
                                <TableCell>{data.ContinuityData.FullURL}</TableCell>
                              <TableCell>{data.ContinuityData.TotalHTMLElements}</TableCell>
                              <TableCell>{data.ContinuityData.TotalCSSElements}</TableCell>
                              <TableCell>{data.ContinuityData.USWDSPresent}</TableCell>
                              <TableCell>{data.ContinuityData.USWDSTotal}</TableCell>
                              <TableCell>{data.ContinuityData.PageDepth}</TableCell>
                              <TableCell>{data.ContinuityData.USWDSPercent}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {/* Option Toggle bar */}
                  <TabToggle
                    activeTab={activeTab}
                    onReadabilityTabClick={handleReadabilityTabClick}
                    onAccessibilityTabClick={handleAccessibilityTabClick}
                    onContinuityTabClick={handleContinuityTabClick} // Add this line
                  />
                </CardContent>
              )}
            </Card>
          </animated.div>
        )}
        <div>
          {/* when the table is displayed, enable run report */}
          {(accessibilityTableVisible || readabilityTableVisible || continuityTableVisible) && (
            <button
              type="button"
              className="px-4 py-3 bg-black rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform border border-white"
              onClick={handleRunReportClick}
            >
              <div className="flex items-center">
                <span className="ml-2">Run Report</span>
                <svg
                  className=" ml-2 h-4 w-4"
                  fill="black"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="20" y2="10" />
                  <line x1="18" x2="18" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="16" />
                </svg>
              </div>
            </button>
          )}
          {/* renders the chart when user run report */}
          {isBlackBoxVisible && (
            //pass this div toPDF to be exported
            <button
              type="button"
              className="mx-8 px-4 py-3  bg-black rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform border border-white"
              onClick={() => toPDF()}
            >
              <div class="flex items-center">
                <span class="ml-2">Export</span>
                <svg
                  className=" ml-2 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
            </button>
          )}
        </div>
        {isBlackBoxVisible && (
          <div ref={targetRef}>
            {/* Chart */}
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: ['Continuity', 'Accessibility', 'Flesch'],
                },
              ]}
              series={[
                { data: [data.ContinuityData.TotalHTMLElements, data.ContinuityData.TotalCSSElements, data.ContinuityData.USWDSPercent] },
                { data: [data.AccessibilityData.ElementCounts.iframe, data.AccessibilityData.ElementCounts.img, 0] },
                { data: [data.FleschData[0].TotalWords, data.FleschData[0].TotalSentences, data.FleschData[0].FleschReadingEase] },
              ]}
              width={500}
              height={300}
            />
          </div>
        )}
      </div>
    </GradientBackground>
  );
}
