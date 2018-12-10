import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import TextField from '@material-ui/core/TextField/TextField'
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText'

const styles = theme => ({
  label: {
    width: "109px",
    textAlign: "left",
    fontSize: "16px",
    fontFamily: "ArialMT",
  },
  labelError: {
    width: "109px",
    textAlign: "left",
    fontSize: "16px",
    fontFamily: "ArialMT",
    color: "#ff9200",
    display: "grid",
    gridTemplateColumns: "10px 1fr",
  },
  textField: {
    height: "53px",
    width: "380.9px",
  },
  inputRoot: {
    color: "#373d40",
    borderColor: `${"#dddb36"} !important`,
    backgroundColor : `rgba(245, 248, 249, 0.3)`
  },
  inputLabelRoot: {
    color: "#373d40",
  },
  inputRootError: {
    color: "#ff9200",
    borderColor: `${"#ff9200"} !important`,
    backgroundColor : `rgba(245, 248, 249, 0.3)`
  },
  inputLabelRootError: {
    color: "#ff9200",
  },
  placeholder: {
    color: "#b1bfcd",
  },

  notchedOutline: {
  },

  notchedOutlineError: {
    borderColor: `${"#ff9200"} !important`
  },
  errorText: {
    color: "#ff9200",
  },
  errorDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#ff7343",
  }
})

class CustomTextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      })
    }
  }


  render() {
    const {classes, onClick, label, type, placeholder, error} = this.props
    const {value} = this.state
    let inputLabelProps
    let inputProps
    let labelStyle
    let ph
    if (error !== "") {
      ph = ""
      labelStyle = classes.labelError
      inputLabelProps = {
        classes: {
          root: classes.inputLabelRootError,
        },
      }
      inputProps = {
        classes: {
          root: classes.inputRootError,
          notchedOutline: classes.notchedOutlineError,
        },
      }
    } else {
      ph = placeholder
      labelStyle = classes.label
      inputLabelProps = {
        classes: {
          root: classes.inputLabelRoot,
        },
      }
      inputProps = {
        classes: {
          root: classes.inputRoot,
          notchedOutline: classes.notchedOutline,
        },
      }
    }
    return (
        <React.Fragment>
          <Grid container spacing={8} justify={'flex-start'} alignItems={'center'}>
            {error !== "" &&
            <Grid item className={labelStyle}>
              <div className={classes.errorDot}/>
              <div>{label}</div>
            </Grid>
            }
            {error === "" &&
            <Grid item className={labelStyle}>
              <div>{label}</div>
            </Grid>
            }
            <Grid item>
              <TextField
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                  value={value}
                  id="outlined-bare"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => onClick(e)}
                  type={type}
                  placeholder={ph}
              />
              {error !== "" &&
              <Grid container justify={'flex-end'}>
                <Grid item>
                  <FormHelperText className={classes.errorText}>
                    {error}
                  </FormHelperText>
                </Grid>
              </Grid>
              }
            </Grid>
          </Grid>
        </React.Fragment>
    )
  }
}

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  value: PropTypes.string || PropTypes.number,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default withStyles(styles)(CustomTextField);
