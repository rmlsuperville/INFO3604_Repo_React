//Needed React modules
import React from 'react';
import {Route} from 'react-router-dom';

//This module is used to merge multiple styling classes
import clsx from 'clsx';

//Imported Bootstrap elements
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';

//Imported components to be included somewhere in the document
import RegistrationListing from './club_exec/club_members/RegistrationListing'; // This component captures the registration listing of club members
import AuthUsers from './club_exec/club_members/AuthUsers';//This component captures the listing of authenticated club members
import CreateActivity from './club_exec/club_members/CreateActivity';// This component presents the form to create a new club activity
import ActivityListing from './club_exec/club_members/ActivityListing';// This component captures all the records in the assignment table
import CE_DashboardOptions from './club_exec/DashboardOptions';//This component displays the initial options/features on the dashboard
import EWasteReportsListing from './club_exec/ereports/EWasteReportsListing';//This component captures all pending e-waste records from the database
import CollectedEWasteListing from './club_exec/ereports/CollectedEWasteListing';//This component captures all collected e-waste records from the database
import DonorRegistrationListing from './club_exec/donors/DonorRegistrationListing';//This component captures the registration listing of company and individual donors
import DonorListing from './club_exec/donors/AuthDonors';//This component captures the authenticated individual and company donors
import Donations from './club_exec/donors/Donations';// This component displays all the submmitted donations by authenticated donors
import ApprovedDonations from './club_exec/donors/ApprovedDonations';// This component displays all the approved donations
import BeneficiaryRegListing from './club_exec/beneficiaries/BeneficiaryRegListing';//This componeny displays registration listing of beneficiaries
import BeneficiaryListing from './club_exec/beneficiaries/AuthBeneficiaries';//This component captures the authenticated beneficiaries
import DonationRequests from './club_exec/beneficiaries/DonationRequests';// This component displays all the submmitted donations requests by authenticated beneficiaries
import ApprovedDonationRequests from './club_exec/beneficiaries/ApprovedDonationReqs';// This component displays all the approved donation requests
import { CEPrimary, CESecondary } from './club_exec/listItems';//These are the items seen on the left-hand side of the dashboard for the club executive interface

import { CM_MainListItems } from './club_member/listItems';//These are the items seen on the left-hand side of the dashboard for the club member interface
import CM_DashboardOptions from './club_member/DashboardOptions';//This component displays the initial options/features on the dashboard
import UpcomingActivities from './club_member/UpcomingActivities';//This component presents a club member's upcoming club assignments
import LogActivity from './club_member/LogActivity';//This component presents a club member's elapsed club assignments to be logged

//These modules allow us to use the states defined in the reducer folder 
import {useSelector, shallowEqual}  from 'react-redux';

const drawerWidth = 300;

//Styling classes defined => which referenced by different elements in the component
const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex'
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '700px'
  },

  cm_drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '230px'
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },

  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginTop: '0',
  },

  container: {
    width: '80%',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },

  paper: {
    marginTop: '20px',
    marginBottom: '20px',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },

  fixedHeight: {
    height: 180,
    width: 280
  },

  depositContext: {
    flex: 1,
  },

}));


//Component Specification using React Hooks => Component as a function
function Dashboard() {

  //This function accesses the auth state in the reducer folder to determine if a user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated, shallowEqual);

  //This function accesses the auth state in the reducer folder to capture the user's information
  const user = useSelector( (state) => state.auth.user, shallowEqual );
  
  console.log(isAuthenticated);

  //Accesses the styling configuration on line 28
  const classes = useStyles();

  const open= true;

  //Here we define the HTML/JSX elements of this component before rendering them on the browser
  //We need to check if the user is authenticated first before rendering the component
  //This defines the dashboard of the club executive interface
  const clubExecView = (

      <Container>
          
          <br/>
          <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            Dashboard
          </Typography>

          <div className={classes.root}>
      
                  {/* Left-Hand Sidebar of Options  */}

                      <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open} style={{zIndex: 0}}>
                        
                        {/*  First Half of Options  */}         
                        <CEPrimary/>

                        <Divider />

                        {/*  Second Half of Options  */}  
                        <CESecondary/>

                      </Drawer>

            {/*  This creates a space between the left-hand side of options on the dashboard and everything on the right  */}  
            <div className={classes.appBarSpacer} />


            <Container className={classes.container} >
              
                <Grid container spacing={1}>

                      {/* The following describes which components are rendered based on the current/submitted url path */}
                      {/* It is always positioned on the right of the dashboard's sidebar options  */}

                      
                      {/* Initially the dashboard options are shown to the user */}
                      <Route path="/api/dashboard" exact  component={CE_DashboardOptions} />   


                      {/* Only this route/url, the RegistrationListing component is shown*/}
                      <Route path="/api/dashboard/reg_listing" exact  component={RegistrationListing} />     

                      {/* Only this route/url, the AuthUsers component is shown*/}
                      <Route path="/api/dashboard/reg_users" exact  component={AuthUsers} />

                      {/* Only this route/url, the CreateActivity component is shown*/}
                      <Route path="/api/dashboard/activity" exact  component={CreateActivity} />

                      {/* Only this route/url, the ActivityListing component is shown*/}
                      <Route path="/api/dashboard/activity_listing" exact  component={ActivityListing} />

                      {/* Only this route/url, the EWasteReportsListing component is shown*/}
                      <Route path="/api/dashboard/ereports" exact  component={EWasteReportsListing} />

                      {/* Only this route/url, the CollectedEWasteListing component is shown*/}
                      <Route path="/api/dashboard/ereports_collected" exact  component={CollectedEWasteListing} />

                      {/* Only this route/url, the DonorRegistrationListing component is shown*/}
                      <Route path="/api/dashboard/donor_reg_listing" exact  component={DonorRegistrationListing} />

                      {/* Only this route/url, the DonorListing component is shown*/}
                      <Route path="/api/dashboard/donor_listing" exact  component={DonorListing} />

                      {/* Only this route/url, the Donations component is shown*/}
                      <Route path="/api/dashboard/donations" exact  component={Donations} />

                      {/* Only this route/url, the ApprovedDonations component is shown*/}
                      <Route path="/api/dashboard/donations_auth" exact  component={ApprovedDonations} />

                      {/* Only this route/url, the BeneficiaryRegListing component is shown*/}
                      <Route path="/api/dashboard/ben_reg_listing" exact  component={BeneficiaryRegListing} />

                      {/* Only this route/url, the BeneficiaryListing component is shown*/}
                      <Route path="/api/dashboard/ben_listing" exact  component={BeneficiaryListing} />

                      {/* Only this route/url, the DonationRequests component is shown*/}
                      <Route path="/api/dashboard/donation_reqs" exact  component={DonationRequests} />

                      {/* Only this route/url, the ApprovedDonationRequests component is shown*/}
                      <Route path="/api/dashboard/donation_reqs_auth" exact  component={ApprovedDonationRequests} />

                </Grid>

            </Container>	

        </div>

    </Container>
  )


  //Here we define the HTML/JSX elements of this component before rendering them on the browser
  //We need to check if the user is authenticated first before rendering the component
  //This defines the dashboard of the club member interface
  const clubMemView = (

      <Container>
            
          <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            Dashboard
          </Typography>

          <div className={classes.root}>
      
                  {/* Left-Hand Sidebar of Options  */}

                      <Drawer variant="permanent" classes={{ paper: clsx(classes.cm_drawerPaper, !open && classes.drawerPaperClose), }} open={open} style={{zIndex: 0}}>
                        
                        {/*  Set of Options  */}
                        <List component="nav"
                            
                            aria-labelledby="nested-list-subheader"
                            
                            subheader={
                              <ListSubheader component="div" inset>
                                <Typography style={{marginTop: '20px', marginBottom: '20px', fontWeight: 'bold'}}>System Entities</Typography>
                              </ListSubheader>
                            }
                          >
                              
                              {CM_MainListItems}
                        
                          </List>

                      </Drawer>

            {/*  This creates a space between the left-hand side of options on the dashboard and everything on the right  */}  
            <div className={classes.appBarSpacer} />


            <Container className={classes.container} style={{marginBottom: '50px'}} >
              
                <Grid container spacing={3}>

                      {/* The following describes which components are rendered based on the current/submitted url path */}
                      {/* It is always positioned on the right of the dashboard's sidebar options  */}

                      
                      {/* Initially the dashboard options are shown to the user */}
                      <Route path="/api/dashboard" exact  component={CM_DashboardOptions} />   
                      
                      {/* On this route, the upcoming club activities are displayed to the user */}
                      <Route path="/api/dashboard/upcoming_act" exact  component={UpcomingActivities} />   
                      
                      {/* On this route, the club activities to be logged are displayed to the user */}
                      <Route path="/api/dashboard/log_act" exact  component={LogActivity} />   
   

                </Grid>

            </Container>	

        </div>

    </Container>
  )


  //The following is rendered/displayed on the browser
  return (
      <div>

        {/* The isAuthenticated state is a boolean */}

        {/* If the user is authenticated and has a user type of 1 (Club Executive), render the elements in clubExecView variable (line 134) */}
        { isAuthenticated && user.userType === 1 ? clubExecView : null}
        
        {/* If the user is authenticated and has a user type of 2 (Club Member), render the elements in clubMemView variable (line 230) */}
        { isAuthenticated && user.userType === 2 ? clubMemView : null }


        {/* Else nothing is shown*/}

      </div>

  );

}

export default Dashboard;//Export the component to be used