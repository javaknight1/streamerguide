import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid } from '@mui/material';
import { RadioGroup, Radio, FormControl, 
  FormHelperText, Card, List, ListItem, 
  Switch, Typography, Divider } from '@mui/joy';
import streamers from './assets/streamers.json';

interface PlansSelected {
  [streamer: string] : {
    price: number,
    plan: string,
    logo: string
  }
}

function App() {
  const [adsFilter, setAdsFilter] = useState(false);
  const [offlineFilter, setOfflineFilter] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [plans, setPlans] = useState<PlansSelected>({});

  useEffect(() => {
    let newTotal = 0.0;
    Object.entries(plans).map(function([streamer, plan]) {
      newTotal += plan.price;
    });
    setTotal(newTotal);
  }, [plans])

  const handleUpdatePlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const streamer = JSON.parse(event.target.value);
    setPlans((prevPlans) => ({...prevPlans, ...streamer}))
  }

  const toggleAdsFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdsFilter(!adsFilter);
  }

  const toggleOfflineFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOfflineFilter(!offlineFilter);
  }

  return (
    <div className="App">
      <div className="App-Title">
        <h1>Streamer Guide</h1>
        <h6>Compare and calculate monthly costs of streaming services</h6>
      </div>
      <div className="App-Filters">
        <Typography textColor="white" endDecorator={<Switch sx={{ ml: 1 }} onChange={toggleAdsFilter}/>}>
          Ads-free
        </Typography>
        <Divider inset="none" orientation="vertical" sx={{ bgcolor: "white", m: 1 }} />
        <Typography textColor="white" endDecorator={<Switch sx={{ ml: 1 }} onChange={toggleOfflineFilter}/>}>
          Only Offline
        </Typography>
      </div>
      <Grid container spacing={12}>
        {/* Cost Breakdown - left pane */}
        <Grid item xs={6} md={3}>
          <div className="Total-Cost">
            <div className="Total-Cost-Header">Total Cost:</div>
            <div className="Total-Cost-Price">${total.toFixed(2)}</div>
            {Object.keys(plans).length > 0 && (
              <>
                <Divider inset="none" sx={{ bgcolor: "white" }} />
                {/* <div className="Total-Cost-Header">Breakdown</div> */}
                {Object.entries(plans).map(([key, value]) => (
                    <div className="Total-Cost-Price">
                      <img className="Total-Cost-Logo" src={value.logo} width="15" height="15"/>
                       {key} - {value.plan} : ${value.price}
                    </div>
                ))}
              </>
            )}
          </div>
        </Grid>
        {/* List of streaming services - right pane */}
        <Grid item xs={6} md={9}>
          {streamers.map((streamer) => 
            <Card variant="soft" size="lg" className="Streamer-Card">
              <div className="Streamer-Card-Title">
                <img className="Streamer-Card-Title-Logo" src={streamer.logo} width="75" height="75"/>
                <div className="Streamer-Card-Title-Text">{streamer.title}</div>
              </div>
              <RadioGroup orientation="horizontal" name="tiers" sx={{ gap: 1, '& > div': { p: 1 } }}>
                {streamer.plans?.filter((plan) => offlineFilter ? plan.offline : true)
                  .filter((plan) => adsFilter ? !plan.ads : true)
                  .map((plan) => 
                <FormControl>
                  <Radio className="Streamer-Card-Plan-Title" overlay 
                    value={JSON.stringify({
                      [streamer.title] : {
                        "price": plan.price,
                        "plan": plan.name,
                        "logo": streamer.logo
                      }
                    })} 
                    onChange={handleUpdatePlan} 
                    label={plan.name + " ($" + plan.price + ")"} />
                  <FormHelperText className="Streamer-Card-Plan-Points">
                    <List size="sm" marker="circle">
                      {plan.points.map((point) => 
                        <ListItem>{point}</ListItem>
                      )}
                    </List>
                  </FormHelperText>
                </FormControl>
                )}
              </RadioGroup>
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
