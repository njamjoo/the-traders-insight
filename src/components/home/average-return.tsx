import { LineChartOutlined } from '@ant-design/icons'
import { Card, Skeleton } from 'antd'
import { useState } from 'react'
import { Text } from '../text'
import jsonData from './tradeHistory.json'
import { Area, AreaConfig } from '@ant-design/plots'

const AverageReturn = () => {
    const [isLoading, setIsLoading] = useState(false);

    const sumProfit = jsonData.reduce((acc, entry) => acc + entry.Profit, 0);
    const avgProfit = sumProfit / jsonData.length;

    const data2024 = jsonData.filter(entry => {
        const year = new Date(entry.Close_Time).getFullYear();
        return year === 2023;
    })

    const config: AreaConfig = {
        data: jsonData,
        xField: "Close_Time",
        yField: "50000",
        appendPadding: [1, 0, 0, 0],
        padding: 0,
        syncViewPadding: true,
        autoFit: true,
        startOnZero: true,
        tooltip: {
            formatter: (data: any) => {
              const formattedValue = `$${(Number(data['Profit'])).toFixed(1)}`;
              return {
                name: "Profit [$]",
                value: formattedValue,
              }
            }
        },
        animation: false,
        xAxis: false,
        yAxis: {
            tickCount: 20,
            min: 40000,
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
        smooth: true,
        line: {
            color: "#135200",
        },
        areaStyle: {
                fill: "#135200"            
        }
        
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
                    backgroundColor: '#d9f7be', /* Set the background color of the circle */
                    display: 'flex',
                    flexShrink: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                    <LineChartOutlined style={{color: '#135200', fontSize: "medium"}}/>
                </div>
                <Text size='md' strong className='secondary' style={{marginLeft: '8px'}}>
                    Average Return
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
                        `$${avgProfit.toFixed(1)}`
                    )}
                </Text>
                <Area {...config} style={{ width: '65%' }}/>
            </div>
        </Card>
    )
}

export default AverageReturn