import { SlidersOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Text } from '../text'
import {  Stock, StockConfig } from '@ant-design/plots'
import ohlcdata from './ohlc-data.json'



const CandlestickChart = () => {

    // Function to parse JSON data and convert specific columns to numbers
    const parseJsonData = (data: any[]): any[] => {
        // Iterate through each object in the array
        return data.map((entry: any) => {
            // Convert 'open' column to number
            if (!isNaN(parseFloat(entry.open))) {
                entry.open = parseFloat(entry.open);
            }
            // Convert 'close' column to number
            if (!isNaN(parseFloat(entry.close))) {
                entry.close = parseFloat(entry.close);
            }
            if (!isNaN(parseFloat(entry.high))) {
                entry.close = parseFloat(entry.close);
            }
            if (!isNaN(parseFloat(entry.low))) {
                entry.close = parseFloat(entry.close);
            }
            return entry;
        });
    };

    const parsedData = parseJsonData(ohlcdata);

    const config: StockConfig = {
        data: parsedData,
        xField: 'date',
        yField: ['open', 'close', 'high', 'low'],
        // yField: 'close',
        legend: false,
        fallingFill: '#a8071a',
        risingFill: '#135200',
        yAxis: {
            tickCount: 6,
            label: {
                style:{
                    stroke: 'transparent',
                }
            },
        },
    }

    

    return (
        <Card 
        style={{ height: '100%' }}
        styles={{
        body:{ padding: "24px 24px 0px 24px" },
        header: { padding: "8px 16px" }
        }}
        title={
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}
        >
            <SlidersOutlined />
            <Text size="sm" style={{ marginLeft: '0.7rem'}}>Preview</Text>
        </div>
        }
        >
        <Stock {...config} height={350} />
        </Card>
    )
}

export default CandlestickChart