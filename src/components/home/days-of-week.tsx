import { BarChartOutlined, LineChartOutlined } from '@ant-design/icons'
import { Card, Skeleton } from 'antd'
import { useState } from 'react'
import { Text } from '../text'
import jsonData from './tradeHistory.json'
import { Bar, BarConfig } from '@ant-design/plots'

const DaysOfWeek = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getDayOfWeek = (dateString: string): number => {
        const date = new Date(dateString);
        return date.getDay();
        };

    // Define a function to calculate the sum of profits for a specific weekday
    const calculateSumOfProfitsForWeekday = (weekday: number): number => {
        // Filter the JSON data for entries corresponding to the given weekday
        const dataForWeekday = jsonData.filter(entry => getDayOfWeek(entry.Close_Time) === weekday);
        
        // Calculate the sum of profits for the filtered data
        const sumOfProfits = dataForWeekday.reduce((total, entry) => total + entry.Profit, 0);
        
        return sumOfProfits;
    };
    
    // Assuming you want to calculate the sum of profits for Monday (1)
    const mondayProfitSum = calculateSumOfProfitsForWeekday(1); // Pass 1 for Monday
    const TuesdayProfitSum = calculateSumOfProfitsForWeekday(2);
    const WednesdayProfitSum = calculateSumOfProfitsForWeekday(3);
    const ThursdayProfitSum = calculateSumOfProfitsForWeekday(4);
    const FridayProfitSum = calculateSumOfProfitsForWeekday(5);

    const data = [
        { day: 'Monday', value: mondayProfitSum },
        { day: 'Tuesday', value: TuesdayProfitSum },
        { day: 'Wednesday', value: WednesdayProfitSum },
        { day: 'Thursday', value: ThursdayProfitSum },
        { day: 'Friday', value: FridayProfitSum },

    ];


    const config  = {
        data: data,
        xField: "value",
        yField: "day",
        horizontal: false,
        animation: false,
        autoFit: true,
        startOnZero: true,
        color: "#002c8c",
        // color: (datum: any) => {
        //     const value = Number(datum.value); // Get the value from the data
        //     return value >= 0 ? 'green' : 'red'; // Return 'green' for positive values and 'red' for negative values
        // },
        yAxis: {
            tickCount: 20,
            label: {
                style:{
                    stroke: 'transparent',
                }
            },
            grid: {
                line: {
                    style:{
                        stroke: 'transparent',
                    }
                }
            }
        },
        tooltip: {
            formatter: (data: any) => {
              const formattedValue = `$${(Number(data['value'])).toFixed(1)}`;
              return {
                name: "Profit [$]",
                value: formattedValue,
              }
            }
        },
        
    }

    return (
        <Card
            style={{ height: "96px", padding: 0}}
            styles={{body: {padding: "8px 8px 8px 12px"}}}
            size='small'
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                }}
            >
                <div style={{
                    width: '40px', /* Adjust the width and height for the size of the circle */
                    height: '40px',
                    borderRadius: '50%', /* Create a circular shape */
                    backgroundColor: '#bae0ff', /* Set the background color of the circle */
                    display: 'flex',
                    flexShrink: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                    <BarChartOutlined style={{color: '#002c8c', fontSize: "medium"}}/>
                </div>
                <Text size='md' strong className='secondary' style={{marginLeft: '8px'}}>
                    Max Daily Gains
                </Text>
            </div>
            <div
                style={{ display: "flex", justifyContent: "space-between"}}
            >
                <Text
                    size='xxl'
                    strong
                    style={{
                        flex: 1,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        textAlign: 'start',
                        marginLeft: '55px',
                        fontVariantNumeric: 'tabular-nums'
                    }}
                >
                    {isLoading ? (
                        <Skeleton active/>
                    ): (
                        `$${(mondayProfitSum/1000).toFixed(1)}k`
                    )}
                </Text>
                    <Bar {...config} xAxis={false} style={{ width: '65%'}}/>
            </div>
        </Card>
    )
}

export default DaysOfWeek