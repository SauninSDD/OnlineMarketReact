import React, {FC, useRef} from 'react';
import {Card, Divider, Carousel} from 'antd';
import {EnvironmentOutlined, PhoneOutlined, MailOutlined} from '@ant-design/icons';
import ImagePizza from "../assets/pizza1.jpg"
import ImagePizza2 from "../assets/pizza2.jpg"
import {useTranslation} from "react-i18next";

const {Meta} = Card;

const AboutPage: FC = () => {
    const {t} = useTranslation('AboutPage');
    const carouselRef = useRef<any>(null);

    const companyHistory: string = t('companyHistory');

    return (
        <Card>
            <div style={{maxWidth: '100%'}}>
                <Carousel ref={carouselRef} autoplay fade autoplaySpeed={10000}>
                    <div>
                        <Card cover={<img src={ImagePizza} alt="Филиал 1" style={{width: '100%'}}/>}>
                            <Meta title="Филиал в городе Вологда"  description={
                                <h3 style={{fontSize: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'justify', color:"black"}}>
                                    {t('branch1')}
                                </h3>
                            }/>
                        </Card>
                    </div>
                    <div>
                        <Card cover={<img src={ImagePizza2} alt="Филиал 2" style={{width: '100%'}}/>}>
                            <Meta title="Филиал в городе Москва"  description={
                                <h3 style={{fontSize: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'justify', color:"black"}}>
                                    {t('branch2')}
                                </h3>
                            }/>
                        </Card>
                    </div>
                </Carousel>
            </div>

            <Divider/>

            <h3 style={{fontSize: '28px', fontFamily: 'Arial, sans-serif', textAlign: 'justify'}}> {t('aboutCompany')}</h3>

            <p style={{fontSize: '24px', fontFamily: 'Arial, sans-serif', textAlign: 'justify'}}>{companyHistory.split('nn').map((paragraph, index) => (
                <span key={index}>
                        {paragraph}
                    <br />
                    </span>
            ))}</p>

            <Divider/>

            <h3 style={{fontSize: '28px', fontFamily: 'Arial, sans-serif'}}> {t('contacts')} </h3>

            <p style={{fontSize: '24px', fontFamily: 'Arial, sans-serif'}}>
                <EnvironmentOutlined/> {t('address')}
            </p>

            <p style={{fontSize: '24px', fontFamily: 'Arial, sans-serif'}}>
                <PhoneOutlined/> {t('phone')}
            </p>

            <p style={{fontSize: '24px', fontFamily: 'Arial, sans-serif'}}>
                <MailOutlined/> {t('email')}
            </p>
        </Card>
    );
};

export default AboutPage;