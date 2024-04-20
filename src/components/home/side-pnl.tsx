import { RiseOutlined } from '@ant-design/icons'
import { Card, Skeleton } from 'antd'
import { useState } from 'react'
import { Text } from '../text'
import jsonData from './tradeHistory.json'
import { Column } from '@ant-design/plots'

const SidePnl = () => {
    const [isLoading, setIsLoading] = useState(false);

    const calculateSumOfProfitsByOrderType = (orderType: string, jsonData: any[]): number => {
        // Filter the JSON data for entries corresponding to the given order type
        const dataForOrderType = jsonData.filter((entry: any) => entry.Type === orderType);
        
        // Calculate the sum of profits for the filtered data
        const sumOfProfits = dataForOrderType.reduce((total: number, entry: any) => total + entry.Profit, 0);
        
        return sumOfProfits;
    };
    
    const datax = [
        {Type: "Short", Returns: calculateSumOfProfitsByOrderType("sell", jsonData)},
        {Type: "Long", Returns: calculateSumOfProfitsByOrderType("buy", jsonData)}
    ];
    
    const config  = {
        data: datax,
        xField: "Type",
        yField: "Returns",
        horizontal: false,
        animation: false,
        autoFit: true,
        startOnZero: true,
        color: (datax: any) =>
        {
            return datax.Type === "Short" ? "#ffe58f" : "#ffc53d";
        },
        xAxis: {
            line: {
                style: {
                    stroke: "transparent", // Hide xAxis line
                },
            },
            tickLine: {
                style: {
                    stroke: "transparent", // Hide xAxis tick lines
                },
            },
        },
        yAxis: {
            tickCount: 0,
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
              const formattedValue = `$${(Number(data['Returns'])/1000).toFixed(1)}k`;
              return {
                name: "Profit [$]",
                value: formattedValue,
              }
            },
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
                    backgroundColor: '#fff1b8', /* Set the background color of the circle */
                    display: 'flex',
                    flexShrink: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                    <RiseOutlined style={{color: '#874d00', fontSize: "medium"}}/>
                </div>
                <Text size='md' strong className='secondary' style={{marginLeft: '8px'}}>
                    Total Profit
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
                        `$${((calculateSumOfProfitsByOrderType("sell", jsonData)+calculateSumOfProfitsByOrderType("buy", jsonData))/1000).toFixed(1)}k`
                    )}
                </Text>
                    <Column {...config} style={{ width: '65%'}}/>
            </div>
        </Card>
    )
}

export default SidePnl