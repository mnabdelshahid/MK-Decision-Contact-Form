import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";


const styles = {
    contactForm: {}
  };

export class ContactForm extends Component {
    state = {
        name: '',
        email: '',
        message: ''
    }

    handleChange = input => event => {
            const { name, value } = event.target;

            this.setState({ [name]: value });

    }

    handleSubmit = async event => {

        const { name, email, message } = this.state;

        async function postData(url = '', data = {}) {

                        const response = await fetch(url, {
                        method: 'POST',
                        mode: 'no-cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        redirect: 'follow',
                        referrer: 'no-referrer',
                        body: JSON.stringify(data)
                    });
                return await response.json();
            }
        try {
            const data = await postData('https://mnabdelshahid.execute-api.us-west-2.amazonaws.com/prod/submit', { name, email, message });
            console.log(JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { classes } = this.props;
        const { name, email, message } = this.state;
        return (
            <div className={classes.container}>
            <CssBaseline />
                <React.Fragment>
                      <Typography variant="h3" gutterBottom>
                        Contact Form
                      </Typography>
                      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        <Grid item>
                          <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            autoComplete="name"
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="outlined-basic"
                            required
                            name="message"
                            label="Message"
                            variant="outlined"
                            fullWidth
                            autoComplete="message"
                          />
                        </Grid>
                        <Grid item >
                            <Button
                           className={classes.formButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                            >
                            Submit
                            </Button>
                            </Grid>
                      </Grid>
                    </React.Fragment>

            </div>

        );
    }
}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ContactForm);
