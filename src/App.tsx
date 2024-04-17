import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormControlLabel, Grid } from '@mui/material';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import streamers from './assets/streamers.json';
import { merge } from 'lodash';

interface PlansSelected {
  [streamer: string] : {
    price: number,
    plan: string
  }
}

function App() {
  const [total, setTotal] = useState(0.0);
  const [plans, setPlans] = useState<PlansSelected>({});

  useEffect(() => {
    console.log("Current plans: ", plans);
    let newTotal = 0.0;
    Object.entries(plans).map(function([streamer, plan]) {
      newTotal += plan.price;
    });
    setTotal(newTotal);
  }, [plans])

  const handleUpdatePlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const streamer = JSON.parse(event.target.value);
    console.log("New streamer: ", streamer)
    setPlans((prevPlans) => ({...prevPlans, ...streamer}))
  }

  return (
    <div className="App">
      <div className="App-Title">
        <h1>Streamer Guide</h1>
        <h6>Compare and calculate monthly costs of streaming services</h6>
      </div>
      <Grid container spacing={12}>
        <Grid item xs={6} md={4}>
          <div className="Total-Cost">
            <div className="Total-Cost-Header">Total Cost:</div>
            <div className="Total-Cost-Price">${total.toFixed(2)}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={8}>
          {streamers.map((streamer) => 
            <Card variant="soft" size="lg" className="Streamer-Card">
              <div className="Streamer-Card-Title">
                <img className="Streamer-Card-Title-Logo" src={streamer.logo} width="75" height="75"/>
                <div className="Streamer-Card-Title-Text">{streamer.title}</div>
              </div>
              <RadioGroup orientation="horizontal" name="tiers" sx={{ gap: 1, '& > div': { p: 1 } }}>
                {streamer.plans?.map((plan) => 
                <FormControl>
                  <Radio className="Streamer-Card-Plan-Title" overlay 
                    value={JSON.stringify({
                      [streamer.title] : {
                        "price": plan.price,
                        "plan": plan.name
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
