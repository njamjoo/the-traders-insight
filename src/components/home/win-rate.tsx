import { PieChartOutlined } from '@ant-design/icons'
import { Card, Col, Row, Skeleton } from 'antd'
import { useState } from 'react'
import { Text } from '../text'
import jsonData from './tradeHistory.json'
import { Area, AreaConfig, Pie, PieConfig, Progress } from '@ant-design/plots'

const WinRate = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Step 1: Count the total number of trades
    const totalTrades = jsonData.length;

    // Step 2: Count the number of winning trades
    const winningTrades = jsonData.filter(entry => entry.Profit > 0).length;
    const losingTrades = jsonData.filter(entry => entry.Profit < 0).length;

    // Step 3: Calculate the win rate
    const winRate = (winningTrades / totalTrades) * 100; // Convert to percentage

    const config = {
        data: [
            {type: "Wins", value: winningTrades},
            {type: "Losses", value: losingTrades}
        ],
        percent: 0.571,
        angleField: 'value',
        colorField: 'type',
        autoFit: true,
        appendPadding: [1, 0, 0, 0],
        padding: 0,
        syncViewPadding: true,
        color: ["#780650", "#ffd6e7"]
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
                            backgroundColor: '#ffd6e7', /* Set the background color of the circle */
                            display: 'flex',
                            flexShrink: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}>
                            <PieChartOutlined style={{color: '#780650', fontSize: "medium"}}/>
                        </div>
                        <Text size='md' strong className='secondary' style={{marginLeft: '8px'}}>
                            Win Rate 
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
                                `${winRate.toFixed(1)}%`
                            )}
                        </Text>
                        <Progress {...config} style={{width:'65%'}} ></Progress>
                    </div>     
        </Card>
    )
}

export default WinRate