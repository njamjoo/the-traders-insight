import { AverageReturn, CandlestickChart, DaysOfWeek, RunningBalance, SidePnl, TradeHistory, WinRate} from "@/components"
import { Row, Col } from "antd"

export const Home = () => {
    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={24} xl={8}>
                    <AverageReturn />
                </Col>
                <Col xs={24} sm={24} xl={8}>
                    <DaysOfWeek />
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
                    <CandlestickChart />
                    <div
                        style={{
                            marginTop: '32px'
                        }}
                     ></div>
                    <RunningBalance />
                </Col>                
            </Row>
        </div>        
    )    
}
