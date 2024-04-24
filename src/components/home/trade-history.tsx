import { DeploymentUnitOutlined, FileProtectOutlined } from '@ant-design/icons'
import { Card, List, Skeleton, Table, Tag } from 'antd'
import { Text } from '../text'
import { useState } from 'react';
import TradeHistorySkeleton from '../skeleton/trade-history';
import jsonData from './tradeHistory.json'
import { render } from 'react-dom';

const TradeHistory = () => {
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            title: <Text size='xs'>SYMBOL</Text>,
            dataIndex: "Symbol",
            key: "Symbol",
            width: "auto",
            render: (text: any) => {
                const color = "#006d75";
            
                return (
                    <span 
                        style={{ color : color}}>    
                        {text}                   
                    </span>
                )
            }

        },
        {
            title: <Text size='xs'>TYPE</Text>,
            dataIndex: "Type",
            key: "Type",
            width: "auto",            
            render: (text: any) => {
                const type = String(text);
                let borderColor;
                let actionText;
        
                // Set border color based on profit value
                if (type === 'buy') {
                  borderColor = '#69b1ff';
                  actionText = 'LONG'
                } else if (type === 'sell') {
                  borderColor = '#69b1ff';
                  actionText = "SHORT"
                }
        
                // Apply colored border around the value
                return (
                  <div style={{ border: `1px solid ${borderColor}`, padding: '0px 6px', display: 'inline-block', borderRadius: "5px", fontSize: "13px" }}>
                    {actionText}
                  </div>
                );
              },
        },
        {
            title: <Text size='xs'>LOTS</Text>,
            dataIndex: "Lots",
            key: "Lots",
            width: "auto",     
            render: (text: any) => {
                const lots = Number(text);
                const formattedlots = lots.toFixed(2);    
                
                return (
                    formattedlots
                )
            }
        },
        {
            title: <Text size='xs'>OPEN TIME</Text>,
            dataIndex: "Open_Time",
            key: "Open_Time",
            width: "auto",            
        },
        {
            title: <Text size='xs'>OPEN PRICE</Text>,
            dataIndex: "Open_Price",
            key: "Open_Price",
            width: "auto",  
            // align: "center",          
        },        
        // {
        //     title: <Text size='xs'>CLOSE TIME</Text>,
        //     dataIndex: "Close_Time",
        //     key: "Close_Time",
        // },
        {
            title: <Text size='xs'>DURATION</Text>,
            dataIndex: "Duration",
            key: "Duration",
            width: "auto",
            render: (text: any, record: any) => {
                let durationInDays;
                const startDate = new Date(record.Open_Time);
                const endDate = new Date(record.Close_Time);

                const difference = endDate.getTime() - startDate.getTime();

                durationInDays = Math.ceil(difference / (1000*60*60*24));

                if (durationInDays < 2) {
                    return <Text>{durationInDays} Day</Text>
                }
                else {
                    return <Text>{durationInDays} Days</Text>
                }

            },
        },
        {
            title: <Text size='xs'>CLOSE PRICE</Text>,
            dataIndex: "Close_Price",
            key: "Close_Price",
            width: "auto",
            // align: "center",
        },
        {
            title: <Text size='xs'>RETURN [$]</Text>,
            dataIndex: "Profit",
            key: "Profit",
            width: "auto",
            render: (text: any) => {
                const profit = Number(text);
                const formattedProfit = profit.toFixed(1); // Format to one decimal place
                const color = profit > 0 ? '#003eb3' : profit < 0 ? '#cf1322' : 'black'; // Set color based on profit value
        
                return (
                  <span style={{ color: color}}>
                    ${formattedProfit}
                  </span>
                );
              },
        },
        {
            title: <Text size='xs'>STATUS</Text>,
            dataIndex: "Status",
            key: "Status",
            width: "auto",
            render: (text: any, record: any) => {
                // Compute the value for the new column based on the 'amount' value
                const amount = Number(record.Profit);
                let outcomeText;
                let color;
        
                if (amount > 0) {
                  outcomeText = 'Win';
                  color = 'blue'; // Set color to green for wins
                } else if (amount < 0) {
                  outcomeText = 'Loss';
                  color = 'red'; // Set color to red for losses
                } else {
                  outcomeText = 'Draw';
                  color = 'gray'; // Set color to gray for draws
                }
        
                return (
                  <Tag color={color} >
                    {outcomeText.toUpperCase()}
                  </Tag>
                );
              },
        },        
        {
            title: <Text size='xs'>FEE [$]</Text>,
            dataIndex: "Commission",
            key: "Commission",
            width: "auto",
            render: (text: any) => {
                const fee = Number(text);
                const formattedfee = fee.toFixed(1);    
                
                return (
                    formattedfee
                )
            }
        },
        // {
        //     title: <Text size='xs'>BALANCE [$]</Text>,
        //     dataIndex: "50000",
        //     key: "50000",
        //     width: "auto",
        //     render: (text: any) => {
        //         return <span> ${Number(text).toFixed(1)} </span>
        //     },
        // },
    ]

    return (
        <Card 
            style={{ height: '100%'}} 
            headStyle= {{ padding: '8px 16px' }} 
            bodyStyle={{ padding: '0 1rem' }}
            title={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <DeploymentUnitOutlined />
                    <Text size="sm" style={{ marginLeft: "0.7rem"}}>
                        Trade History
                    </Text>
                </div>
            }
        >
            {isLoading ? (
                // <List
                //     itemLayout='horizontal'
                //     dataSource={Array.from({ length: 5 }).map((_, index) => ({
                //         id: index,
                //     }))}
                //     renderItem={() => <TradeHistorySkeleton />}
                // />
                <Skeleton active />
            ) : (
                <div style={{
                    display: 'flex',
                    alignContent: 'center',
                    padding: '16px 0px',
                    height: '100%'
                }}>
                    <Table 
                        dataSource={jsonData}
                        columns={columns} 
                        scroll={{x: "800px", y: "768px"}} //Change y later on based on how components will look like
                        size='small'
                        pagination={{ defaultPageSize: 20}}
                        // tableLayout='auto'                       
                    />                

                </div>
            )}        
        </Card>
    )
}

export default TradeHistory