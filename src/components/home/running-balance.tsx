import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
import jsonData from './tradeHistory.json'



const RunningBalance = () => {
  
  const config: AreaConfig = {
    data: jsonData,
    xField: "Close_Time",
    yField: "50000",
    autoFit: true,
    isStack: false,
    animation: true,
    startOnZero: false,
    smooth: true,
    color: "green", 
    yAxis: {
      tickCount: 4,
      min: 40000,
      nice: true,
      label: {
        formatter: (v: string) => {
          return `$${Number(v) /1000}k`
        }
      }  
    },
    xAxis: {
      nice: true,
      tickCount: 8,
    },
    tooltip: {
      formatter: (data: any) => {
        const formattedValue = `$${(Number(data['50000']) / 1000).toFixed(1)}k`;
        return {
          name: "Balance [$]",
          value: formattedValue,
        }
      }
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
        <DollarOutlined />
        <Text size="sm" style={{ marginLeft: '0.7rem'}}>Balance</Text>
      </div>
    }
    >
      <Area {...config} height={350}></Area>
    </Card>
  )
}

export default RunningBalance