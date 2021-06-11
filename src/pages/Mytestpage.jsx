
import * as React from 'react';

import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';

import { useLocalization } from '@progress/kendo-react-intl';
import { filterBy } from '@progress/kendo-data-query';

import { Grid, Column, ColumnMenu } from '../components/Grid';
import { Chart } from '../components/Chart';
import { FullNameCell, FlagCell, OnlineCell, RatingCell, EngagementCell, CurrencyCell } from '../components/GridCells';
import { ChartContainer } from '../components/chart-container.jsx';
import { Richtext } from '../components/Richtext.jsx';
import {HookDemo} from "../components/HookDemo.jsx";

import { AppContext } from '../AppContext'

//import { employees } from './../resources/employees';
import { mytestemployees } from '../resources/mytestemployees';
//import { testusers } from '../resources/testusers';
import { orders } from '../resources/orders';

const Mytestpage = () => {
    //const [data, setData] = React.useState(employees);
    const [data, setData] = React.useState(mytestemployees);
    const [users, setUsers] = React.useState([]);
    //const [users, setUsers] = React.useState(testusers.data);
    const [isTrend, setIsTrend] = React.useState(true);
    const [isMyTeam, setIsMyTeam] = React.useState(true);

    const localizationService = useLocalization();

    const isChartChangeRef = React.useRef(false);
    const onChartRefresh = React.useCallback(
        () => null,
        []
    );

    React.useEffect(() => {
        isChartChangeRef.current = false;
    });

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }, []);

    const { teamId } = React.useContext(AppContext);
    const gridFilterExpression = isMyTeam ? {
            logic: "and",
            filters: [{ field: "teamId", operator: "eq", value: teamId }]
        } : null;

    const [range, setRange] = React.useState({
        start: new Date('2020-01-01T21:00:00.000Z'),
        end: new Date('2020-04-29T21:00:00.000Z')
    });
    const onRangeChange = React.useCallback(
        (event) => {
            setRange({
                start: event.value.start,
                end: event.value.end
            })
        },
        [setRange]
    );
    const trendOnClick = React.useCallback(
        () => {
            isChartChangeRef.current = true;
            setIsTrend(true);
        },
        [setIsTrend]
    );
    const volumeOnClick = React.useCallback(
        () => {
            isChartChangeRef.current = true;
            setIsTrend(false);
        },
        [setIsTrend]
    );
    const myTeamOnClick = React.useCallback(
        () => setIsMyTeam(true),
        [setIsMyTeam]
    );
    const allTeamOnClick = React.useCallback(
        () => setIsMyTeam(false),
        [setIsMyTeam]
    );

    return (
        <div id="Dashboard" className="dashboard-page main-content">           
            <div className="card-container grid">
                <h3 className="card-title">CRM Team</h3>
                <span></span>
                <div className="card-component">
                    <Grid style={{ height: '400px' }} data={users} onDataChange={users=>setUsers(users)}>
                        <Column field="id" title="ID" width="40px" />
                        <Column field="name" title="Name" columnMenu={ColumnMenu} width="250px" />
                        <Column field="email" title="Email" columnMenu={ColumnMenu} width="250px" />
                        <Column field="address.street" title="Address" columnMenu={ColumnMenu} width="250px" />
                        <Column field="phone" title="Phone" columnMenu={ColumnMenu} width="250px" />
                    </Grid>
                </div>
                <div className="card-component">
                    <ChartContainer />
                    {/* <Logger title="Event log" events={this.state.events} /> */}
                </div>
                <div className="card-component">
                    <Richtext />
                </div>
                <div><HookDemo /></div>
                <div className="card-component">
                    <Grid data={filterBy(data, gridFilterExpression)} style={{ height: 450 }} onDataChange={data => setData(data)}>
                        <Column title={localizationService.toLanguageString('custom.employee')} groupable={false}>
                            <Column field={'fullName'} title={localizationService.toLanguageString('custom.contactName')} columnMenu={ColumnMenu} width={230} cell={FullNameCell} />
                            <Column field={'jobTitle'} title={localizationService.toLanguageString('custom.jobTitle')} columnMenu={ColumnMenu} width={230} />
                            <Column field={'country'} title={localizationService.toLanguageString('custom.country')} columnMenu={ColumnMenu} width={100} cell={FlagCell} />
                            <Column field={'isOnline'} title={localizationService.toLanguageString('custom.status')} columnMenu={ColumnMenu} width={100} cell={OnlineCell} filter={'boolean'} />
                        </Column>
                        <Column title={localizationService.toLanguageString('custom.performance')} groupable={false}>
                            <Column field={'rating'} title={localizationService.toLanguageString('custom.rating')} columnMenu={ColumnMenu} width={110} cell={RatingCell} filter={'numeric'} />
                            <Column field={'target'} title={localizationService.toLanguageString('custom.engagement')} columnMenu={ColumnMenu} width={200} cell={EngagementCell} filter={'numeric'} />
                            <Column field={'budget'} title={localizationService.toLanguageString('custom.budget')} columnMenu={ColumnMenu} width={100} cell={CurrencyCell} filter={'numeric'} />
                        </Column>
                        <Column title={localizationService.toLanguageString('custom.contacts')} groupable={false}>
                            <Column field={'phone'} title={localizationService.toLanguageString('custom.phone')} columnMenu={ColumnMenu} width={130} />
                            <Column field={'address'} title={localizationService.toLanguageString('custom.address')} columnMenu={ColumnMenu} width={200} />
                        </Column>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Mytestpage;

