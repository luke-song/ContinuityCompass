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

//Imoorting MUI chart, react-pdf, media-query
import { BarChart } from '@mui/x-charts/BarChart';
import { usePDF } from 'react-to-pdf';
import useMediaQuery from '@mui/material/useMediaQuery';

//Sample Data
const AccessibilityData = [
  {
    htmlElements: 13,
    cssElements: 32,
    score: 24.02,
  },
  {
    htmlElements: 21,
    cssElements: 31,
    score: 23.09,
  },
  {
    htmlElements: 35,
    cssElements: 42,
    score: 25.23,
  },
];

const ReadabilityData = [
  {
    htmlElements: 13,
    cssElements: 32,
    images: 5,
    links: 20,
    forms: 8,
    headings: 3,
    videos: 2,
    score: 24.02,
  },
  {
    htmlElements: 21,
    cssElements: 32,
    images: 8,
    links: 25,
    forms: 12,
    headings: 5,
    videos: 3,
    score: 23.09,
  },
  {
    htmlElements: 35,
    cssElements: 42,
    images: 12,
    links: 30,
    forms: 15,
    headings: 8,
    videos: 5,
    score: 25.23,
  },
  {
    htmlElements: 18,
    cssElements: 28,
    images: 6,
    links: 18,
    forms: 6,
    headings: 4,
    videos: 1,
    score: 22.15,
  },
  {
    htmlElements: 25,
    cssElements: 38,
    images: 10,
    links: 28,
    forms: 10,
    headings: 6,
    videos: 4,
    score: 21.87,
  },
  {
    htmlElements: 30,
    cssElements: 45,
    images: 15,
    links: 35,
    forms: 18,
    headings: 10,
    videos: 6,
    score: 26.45,
  },
  {
    htmlElements: 16,
    cssElements: 24,
    images: 4,
    links: 16,
    forms: 4,
    headings: 2,
    videos: 1,
    score: 20.55,
  },
  {
    htmlElements: 23,
    cssElements: 36,
    images: 9,
    links: 23,
    forms: 9,
    headings: 5,
    videos: 3,
    score: 19.78,
  },
];

const chartData = [
  { year: 2014, population: 7295.290765 },
  { year: 2015, population: 7379.797139 },
  { year: 2016, population: 7464.022049 },
  { year: 2017, population: 7547.858925 },
  { year: 2019, population: 7713.4681 },
  { year: 2020, population: 7794.798739 },
];

//Main Page
export default function Home() {
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

  //add mobile responsiveness
  const matches = useMediaQuery('(min-width:600px)');

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
    setSubmitted(true);
    setTableVisible(true);
    setActiveTab('accessibility');
    setAccessibilityTableVisible(true); // show accessibility table
    setReadabilityTableVisible(false); // hide readability table
  };

  //toggle readability Tab
  const handleReadabilityTabClick = () => {
    setActiveTab('readability');
    setReadabilityTableVisible(true);
    setAccessibilityTableVisible(false);
  };

  //toggle accessibility Tab
  const handleAccessibilityTabClick = () => {
    setActiveTab('accessibility');
    setAccessibilityTableVisible(true);
    setReadabilityTableVisible(false);
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
              <div className="flex items-center justify-center p-2 rounded-md w-full md:w-[745px] h-[50px]">
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
                    className="bg-black bg-opacity-50 text-[#33ff33] text-lg border-none focus:outline-none flex-grow mx-2 transition-all duration-500 ease-in-out transform placeholder-green-500 focus:placeholder-transparent"
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
              {/* renders table when the url is submitted and initially show accessibility table*/}
              {submitted && tableVisible && (
                <CardContent>
                  {accessibilityTableVisible && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>HTML elements</TableHead>
                          <TableHead>CSS elements</TableHead>
                          <TableHead>Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      {/* accessibilityData */}
                      <TableBody>
                        {AccessibilityData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {data.htmlElements}
                            </TableCell>
                            <TableCell>{data.cssElements}</TableCell>
                            <TableCell>{data.score}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  {/* when readability button is toggled, shows readability table */}
                  {readabilityTableVisible && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>HTML elements</TableHead>
                          <TableHead>CSS elements</TableHead>
                          {matches && (
                            <>
                              <TableHead>Images</TableHead>
                              <TableHead>Links</TableHead>
                              <TableHead>Forms</TableHead>
                              <TableHead>Headings</TableHead>
                              <TableHead>Videos</TableHead>
                            </>
                          )}
                          <TableHead>Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      {/* readability Data */}
                      <TableBody>
                        {ReadabilityData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{data.htmlElements}</TableCell>
                            <TableCell>{data.cssElements}</TableCell>
                            {matches && (
                              <>
                                <TableCell>{data.images}</TableCell>
                                <TableCell>{data.links}</TableCell>
                                <TableCell>{data.forms}</TableCell>
                                <TableCell>{data.headings}</TableCell>
                                <TableCell>{data.videos}</TableCell>
                              </>
                            )}
                            <TableCell>{data.score}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  {/* Option Toggle bar */}
                  <TabToggle
                    activeTab={activeTab}
                    onReadabilityTabClick={handleReadabilityTabClick}
                    onAccessibilityTabClick={handleAccessibilityTabClick}
                  />
                </CardContent>
              )}
            </Card>
          </animated.div>
        )}
        <div>
          {/* when the table is displayed, enable run report */}
          {(accessibilityTableVisible || readabilityTableVisible) && (
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
                  data: ['HTML elements', 'CSS elements', 'Score'],
                },
              ]}
              series={[
                { data: [13, 21, 35] },
                { data: [32, 31, 42] },
                { data: [24.02, 23.09, 25.23] },
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
