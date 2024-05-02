import { AverageReturn, CandlestickChart, DaysOfWeek, RunningBalance, SidePnl, TradeHistory, WinRate} from "@/components"
import { ArrowDownOutlined, ArrowUpOutlined, CaretUpOutlined, FallOutlined, LikeOutlined } from "@ant-design/icons"
import { Row, Col, Statistic, Card } from "antd"

export const Home = () => {
    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={24} xl={8}>
                    <AverageReturn />
                </Col>
                <Col xs={24} sm={24} xl={8}>
                    <WinRate />
                </Col>
                <Col xs={24} sm={24} xl={8}>
                    <SidePnl />
                </Col>
            </Row>


            <Row
              gutter={[32, 32]}  
              style={{
                marginTop: '32px'
              }}
            >
                <Col
                    xs={24}
                    sm={24}
                    xl={16}
                    style={{
                        height: '100%'
                    }}
                >
                    <TradeHistory />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                    style={{
                        height: '460px'
                    }}
                >
                    {/* <CandlestickChart /> */}
                    <RunningBalance />
                    <div
                        style={{
                            marginTop: '32px'
                        }}
                     ></div>
                    
                    <Row gutter={16}>
                        <Col span={12}>
                        <Card bordered={false}>
                            <Statistic title="Returns" value={52.5} valueStyle={{ color: '#003eb3'}} prefix={<CaretUpOutlined />} suffix="%" />
                            <Statistic title="Average Yearly Returns" value={13.1} valueStyle={{ color: '#003eb3'}} prefix={<CaretUpOutlined />} suffix="%" style={{marginTop: '16px'}}/>
                        </Card>
                        </Col>
                        <Col span={12}>
                        <Card bordered={false}>
                            <Statistic title="Average Win" value={211.2} prefix={"$"} />
                            <Statistic title="Average Loss" value={204.3} prefix = {"$"} style={{marginTop: '16px'}}/>
                        </Card>
                        </Col>
                    </Row>  

                    <Row gutter={16} style={{marginTop: '16px'}}>
                        <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                            title="Maximum Drawdown"
                            value={9.21}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<FallOutlined />}
                            suffix="%"
                            />
                        </Card>
                        </Col>
                        <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                            title="Longest Winning Streak"
                            value={23}
                            />
                        </Card>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{marginTop: '16px'}}>
                        <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                            title="Average Return"
                            value={33.1}
                            precision={1}

                            prefix="$"
                            />
                        </Card>
                        </Col>
                        <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                            title="Longest Losing Streak"
                            value={9}
                            />
                        </Card>
                        </Col>
                    </Row>

                </Col>                
            </Row>
        </div>        
    )    
}
