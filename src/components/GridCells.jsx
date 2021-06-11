import * as React from 'react';

import {
    Sparkline,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartArea
} from '@progress/kendo-react-charts';
import {
    useInternationalization
} from '@progress/kendo-react-intl';

import { images } from './../resources/images';

export const FullNameCell = (props) => {
    const customerPhotoStyle = {
        display: 'inline-block',
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundSize: '32px 35px',
        backgroundPosition: 'center center',
        verticalAlign: 'middle',
        lineHeight: '32px',
        boxShadow: 'inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2)',
        marginLeft: '5px',
        backgroundImage: images[props.dataItem.imgId + props.dataItem.gender]
    };

    const customerName = {
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: '32px',
        paddingLeft: '10px'
    };

    if (props.rowType === 'groupHeader') {
        return null;
    }

    return (
        <td>
            <div style={customerPhotoStyle} />
            <div style={customerName}>{ props.dataItem.fullName }</div>
        </td>
    );
};

export const FlagCell = (props) => {
    if (props.rowType === 'groupHeader') {
        return null;
    }

    return (
        <td style={{textAlign: 'center'}}>
            <img
                src={images[props.dataItem.country]}
                style={{width: 30}}
                alt={props.dataItem.country}
            />
        </td>
    );
};

export const RatingCell = (props) => {
    const MAX_STARS = 5;
    const rating = props.dataItem.rating;

    if (props.rowType === 'groupHeader') {
        return null;
    }

    return (
        <td>
            {
                [...new Array(MAX_STARS)].map((_, idx) => {
                    const isActive = rating <= idx;
                    return (
                        <span
                            key={idx}
                            className={!isActive ? 'k-icon k-i-star' : 'k-icon k-i-star-outline'}
                            style={!isActive ? {color: '#ffa600'} : undefined}
                        />
                    );
                })
            }
        </td>
    );
};

export const OnlineCell = (props) => {
    const badgeStyle = {
        display: 'inline-block',
        padding: '.25em .4em',
        fontSize: '75%',
        fontWeight: 700,
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        borderRadius: '.25rem'
    };

    const onlineBadgeStyle = {
        ...badgeStyle,
        color: '#fff',
        backgroundColor: '#28a745'
    };

    const offlineBadgeStyle = {
        ...badgeStyle,
        color: '#fff',
        backgroundColor: '#dc3545'
    };

    if (props.rowType === 'groupHeader') {
        return null;
    }

    return (
        <td style={{textAlign: 'center'}}>
            {
                props.dataItem.isOnline === true ?
                    <span style={onlineBadgeStyle}>Online</span> :
                    <span style={offlineBadgeStyle}>Offline</span>
            }
        </td>
    );
};

export const EngagementCell = (props) => {
    if (props.rowType === 'groupHeader') {
        return null;
    }

    return (
        <td>
            <Sparkline
                type={'bar'}
                data={props.dataItem.target}
            >
                <ChartArea opacity={0} width={200} />
                <ChartValueAxis visible={false} >
                    <ChartValueAxisItem min={0} max={130} />
                </ChartValueAxis>
            </Sparkline>
        </td>
    );
};

export const CurrencyCell = (props) => {
    const redBoldStyle = {
        color: '#d9534f',
        fontWeight: 600
    };

    const intlService = useInternationalization();

    if (props.rowType === 'groupHeader') {
        return null;
    }

    return (
        <td>
             <span style={props.dataItem.budget < 0 ? redBoldStyle : undefined}>{ intlService.formatNumber(props.dataItem.budget, 'c') }</span>
        </td>
    );
};