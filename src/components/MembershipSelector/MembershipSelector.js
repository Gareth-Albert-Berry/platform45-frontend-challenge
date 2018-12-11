import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid/Grid'
import membershipClassic from '../../assets/buttons/membershipClassic.svg'
import membershipClassicSelected from '../../assets/buttons/membershipClassicSelected.svg'
import membershipGoldSilver from '../../assets/buttons/membershipGoldSilver.svg'
import membershipGoldSilverSelected from '../../assets/buttons/membershipGoldSilverSelected.svg'
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
  membershipButtonWrapper: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    height: "53px",
    width: "53px",
    backgroundColor: "#f5f8f9"
  },
  membershipButtonWrapperError: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    height: "53px",
    width: "53px",
    backgroundColor: "#f5f8f9",
    border: `1px solid ${"#ff9200"}`
  },
  membershipButtonWrapperSelected: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    height: "53px",
    width: "53px",
    backgroundColor: "#b1bfcd"
  },
  membershipImage: {
    height: "26px",
    width: "26px",
  },
  membershipButton: {
    display: "grid",
    gridTemplateColumns: "52.9px 1fr",
    gridGap: "8px",
    alignItems: "center"
  },
  membershipLabel: {
    fontFamily: "ArialMT",
    gridColumn: "2/3",
    fontSize: "14px",
    color: "#b1bfcd"
  },
  membershipLabelError: {
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

class MembershipSelector extends Component {
  render() {
    const {classes, onClick, label, classicSelection, goldSelection, silverSelection, error} = this.props
    let mainLabel
    let membershipLabel
    let membershipButtonWrapper
    if (error !== "") {
      mainLabel = classes.mainLabelError
      membershipLabel = classes.membershipLabelError
      membershipButtonWrapper = classes.membershipButtonWrapperError
    } else {
      mainLabel = classes.mainLabel
      membershipLabel = classes.membershipLabel
      membershipButtonWrapper = classes.membershipButtonWrapper
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
                      className={classes.membershipButton}
                      onMouseEnter={(e) => e.currentTarget.style.cursor = "pointer"}
                      onClick={() => {
                        if (onClick instanceof Function) {
                          onClick('classic')
                        }
                      }}
                  >
                    {!classicSelection &&
                    <div
                        className={membershipButtonWrapper}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.border = `1px solid ${"#b3c1ce"}`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.border = `0px`
                        }}
                    >
                      <img className={classes.membershipImage} src={membershipClassic}/>
                    </div>
                    }
                    {classicSelection &&
                    <div className={classes.membershipButtonWrapperSelected}>
                      <img className={classes.membershipImage} src={membershipClassicSelected}/>
                    </div>
                    }
                    <div className={membershipLabel}>
                      Classic
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <div
                      className={classes.membershipButton}
                      onMouseEnter={(e) => e.currentTarget.style.cursor = "pointer"}
                      onClick={() => {
                        if (onClick instanceof Function) {
                          onClick('silver')
                        }
                      }}
                  >
                    {!silverSelection &&
                    <div
                        className={membershipButtonWrapper}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.border = `1px solid ${"#b3c1ce"}`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.border = `0px`
                        }}
                    >
                      <img className={classes.membershipImage} src={membershipGoldSilver}/>
                    </div>
                    }
                    {silverSelection &&
                    <div className={classes.membershipButtonWrapperSelected}>
                      <img className={classes.membershipImage} src={membershipGoldSilverSelected}/>
                    </div>
                    }
                    <div className={membershipLabel}>Silver</div>
                  </div>
                </Grid>
                <Grid item>
                  <div
                      className={classes.membershipButton}
                      onMouseEnter={(e) => e.currentTarget.style.cursor = "pointer"}
                      onClick={() => {
                        if (onClick instanceof Function) {
                          onClick('gold')
                        }
                      }}
                  >
                    {!goldSelection &&
                    <div
                        className={membershipButtonWrapper}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.border = `1px solid ${"#b3c1ce"}`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.border = `0px`
                        }}
                    >
                      <img className={classes.membershipImage} src={membershipGoldSilver}/>
                    </div>
                    }
                    {goldSelection &&
                    <div className={classes.membershipButtonWrapperSelected}>
                      <img className={classes.membershipImage} src={membershipGoldSilverSelected}/>
                    </div>
                    }
                    <div className={membershipLabel}>Gold</div>
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

MembershipSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  classicSelection: PropTypes.bool,
  goldSelection: PropTypes.bool,
  silverSelection: PropTypes.bool,
};

export default withStyles(styles)(MembershipSelector);
