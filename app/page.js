'use client';
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
import GradientBackground from '../components/GradientBackground';
import react, { useState, useEffect, useRef } from 'react';
import LeonComponent from '@/components/LeonComponent';
import { useSpring, animated } from 'react-spring';
import TabToggle from '@/components/TabToggle';
import { BarChart } from '@mui/x-charts/BarChart';
import { usePDF } from 'react-to-pdf';

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

export default function Home() {
  const [isBlackBoxVisible, setBlackBoxVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('accessibility');
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [leonLoaded, setLeonLoaded] = useState(false);
  const [readabilityTableVisible, setReadabilityTableVisible] = useState(false);
  const [accessibilityTableVisible, setAccessibilityTableVisible] =
    useState(false);
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  //   CSV D3 - Ref
  //     const containerRef = useRef();
  //   const [data, setData] = useState();

  //   useEffect(() => {
  //     d3.csv("/gistemp.csv", d3.autoType).then(setData);
  //   }, []);

  //   useEffect(() => {
  //     if (data === undefined) return;
  //     const plot = Plot.plot({
  //       y: {grid: true},
  //       color: {scheme: "burd"},
  //       marks: [
  //         Plot.ruleY([0]),
  //         Plot.dot(data, {x: "Date", y: "Anomaly", stroke: "Anomaly"})
  //       ]
  //     });
  //     containerRef.current.append(plot);
  //     return () => plot.remove();
  //   }, [data]);

  //   return <div ref={containerRef} />;

  const props = useSpring({
    opacity: leonLoaded ? 1 : 0,
    transform: leonLoaded ? 'translateY(0)' : 'translateY(-50px)',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeonLoaded(true);
    }, 1800); // assuming LeonComponent takes 2 seconds to load
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTableVisible(true);
    setActiveTab('accessibility');
    setAccessibilityTableVisible(true); // show accessibility table
    setReadabilityTableVisible(false); // hide readability table
  };

  const handleSearchClick = () => {
    setActiveTab('accessibility');
    setTableVisible(true);
  };

  const handleReadabilityTabClick = () => {
    setActiveTab('readability');
    setReadabilityTableVisible(true);
    setAccessibilityTableVisible(false);
  };

  const handleAccessibilityTabClick = () => {
    setActiveTab('accessibility');
    setAccessibilityTableVisible(true);
    setReadabilityTableVisible(false);
  };

  const handleRunReportClick = () => {
    setBlackBoxVisible(true);
  };

  return (
    <GradientBackground>
      <div className="flex items-center justify-center flex-col">
        <LeonComponent />
        {leonLoaded && (
          <animated.div style={props}>
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
                      handleSearchClick();
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
                  {readabilityTableVisible && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>HTML elements</TableHead>
                          <TableHead>CSS elements</TableHead>
                          <TableHead>Images</TableHead>
                          <TableHead>Links</TableHead>
                          <TableHead>Forms</TableHead>
                          <TableHead>Headings</TableHead>
                          <TableHead>Videos</TableHead>
                          <TableHead>Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ReadabilityData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {data.htmlElements}
                            </TableCell>
                            <TableCell>{data.cssElements}</TableCell>
                            <TableCell>{data.images}</TableCell>
                            <TableCell>{data.links}</TableCell>
                            <TableCell>{data.forms}</TableCell>
                            <TableCell>{data.headings}</TableCell>
                            <TableCell>{data.videos}</TableCell>
                            <TableCell>{data.score}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
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
          {isBlackBoxVisible && (
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
