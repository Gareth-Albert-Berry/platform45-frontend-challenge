import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import male from '../../assets/buttons/male.svg'
import maleSelected from '../../assets/buttons/maleSelected.svg'
import female from '../../assets/buttons/female.svg'
import femaleSelected from '../../assets/buttons/femaleSelected.svg'
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText'

const styles = theme => ({
  mainLabel: {
    width: "109px",
    textAlign: "left",
    fontSize: "16px",
    fontFamily: "ArialMT",
  },
  mainLabelError: {
    width: "109px",
    textAlign: "left",
    fontSize: "16px",
    fontFamily: "ArialMT",
    color: "#ff9200",
    display: "grid",
    gridTemplateColumns: "10px 1fr"
  },
  genderButtonWrapper: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    height: "53px",
    width: "53px",
    backgroundColor: "#f5f8f9",
  },
  genderButtonWrapperError: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    height: "53px",
    width: "53px",
    backgroundColor: "#f5f8f9",
    border: `1px solid ${"#ff9200"}`
  },
  genderButtonWrapperSelected: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    height: "53px",
    width: "53px",
    backgroundColor: "#b1bfcd"
  },
  genderImage: {
    height: "26px",
    width: "26px"
  },
  genderButton: {
    display: "grid",
    gridTemplateColumns: "52.9px 1fr",
    gridGap: "8px",
    alignItems: "center"
  },
  genderLabel: {
    fontFamily: "ArialMT",
    gridColumn: "2/3",
    fontSize: "14px",
    color: "#b1bfcd"
  },
  genderLabelError: {
    fontFamily: "ArialMT",
    gridColumn: "2/3",
    fontSize: "14px",
    color: "#ff9200"
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

class GenderSelector extends Component {
  render() {
    const {classes, onClick, label, femaleSelection, maleSelection, error} = this.props
    let mainLabel
    let genderLabel
    let genderButtonWrapper
    if (error !== "") {
      mainLabel = classes.mainLabelError
      genderLabel = classes.genderLabelError
      genderButtonWrapper = classes.genderButtonWrapperError
    } else {
      mainLabel = classes.mainLabel
      genderLabel = classes.genderLabel
      genderButtonWrapper = classes.genderButtonWrapper
    }
    return (
        <React.Fragment>
          <Grid container spacing={8} justify={'flex-start'} alignItems={'center'}>
            {error !== "" &&
            <Grid item className={mainLabel}>
              <div className={classes.errorDot}/>
              <div>{label}</div>
            </Grid>
            }
            {error === "" &&
            <Grid item className={mainLabel}>
              <div>{label}</div>
            </Grid>
            }
            <Grid item >
              <Grid container spacing={40}>
                <Grid item>
                  <div
                      className={classes.genderButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.cursor = "pointer"
                      }}
                      onClick={() => {
                        if (onClick instanceof Function) {
                          onClick('male')
                        }
                      }}
                  >
                      {!maleSelection &&
                      <div
                          className={genderButtonWrapper}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.border = `1px solid ${"#b3c1ce"}`
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.border = `0px`
                          }}
                      >
                        <img className={classes.genderImage} src={male}/>
                      </div>
                      }
                      {maleSelection &&
                      <div className={classes.genderButtonWrapperSelected}>
                        <img className={classes.genderImage} src={maleSelected}/>
                      </div>
                      }
                    <div className={genderLabel}>male</div>
                  </div>
                </Grid>
                <Grid item>
                  <div
                      className={classes.genderButton}
                      onMouseEnter={(e) => e.currentTarget.style.cursor = "pointer"}
                      onClick={() => {
                        if (onClick instanceof Function) {
                          onClick('female')
                        }
                      }}
                  >
                    {!femaleSelection &&
                    <div
                        className={genderButtonWrapper}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.border = `1px solid ${"#b3c1ce"}`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.border = `0px`
                        }}
                    >
                      <img className={classes.genderImage} src={female}/>
                    </div>
                    }
                    {femaleSelection &&
                    <div className={classes.genderButtonWrapperSelected}>
                    <img className={classes.genderImage} src={femaleSelected}/>
                    </div>
                    }
                    <div className={genderLabel}>female</div>
                  </div>
                </Grid>
              </Grid>
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

GenderSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  maleSelection: PropTypes.bool,
  femaleSelection: PropTypes.bool,
};

export default withStyles(styles)(GenderSelector);
