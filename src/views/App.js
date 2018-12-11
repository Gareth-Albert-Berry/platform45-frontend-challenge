import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import avatar from '../assets/img/avatar.svg'
import rightArrow from '../assets/buttons/rightArrow.svg'
import leftArrow from '../assets/buttons/leftArrow.png'
import upArrow from '../assets/buttons/upArrow.png'
import downArrow from '../assets/buttons/downArrow.png'
import CustomTextField from '../components/CustomTextField/CustomTextField'
import GenderSelector from '../components/GenderSelector/GenderSelector'
import Grid from '@material-ui/core/Grid/Grid'
import MembershipSelector from '../components/MembershipSelector/MembershipSelector'
import Button from '@material-ui/core/Button/Button'
import { CSSTransition, transit } from "react-css-transition";

const styles = theme => ({
  wrapper: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    display: "grid",
    gridTemplateColumns: "392px 583px 583px",
    height: "892px",
    width: "975px",
    borderRadius: "43px",
    overflow: 'hidden',
  },
  rootMobile: {
    display: "grid",
    gridTemplateRows: "892px 892px 892px",
    height: "1784px",
    width: "1fr",
    borderRadius: "43px",
    overflow: 'hidden',

  },
  main: {
    gridColumn: "1/2",
    display: "grid",
    gridTemplateRows: "516px 43px 53px 225px",
    backgroundColor: "#ffd500"
  },
  mainMobile: {
    gridRow: "1/2",
    display: "grid",
    gridTemplateRows: "516px 43px 53px 225px",
    backgroundColor: "#ffd500"
  },
  mainAvatar: {
    gridRow: "1/2",
    justifySelf: "center",
    marginTop: "161px",
    height: "238px",
    width: "238px",
    marginBottom: "117px",
    overflow: 'hidden',
    borderRadius: "50%",
  },
  mainTitle: {
    gridRow: "2/3",
    justifySelf: "center",
    alignSelf: "center",
    fontSize: "28px",
    color: "#383838",
    fontWeight: "600",
    fontFamily: "Arial-BoldMT",
    marginBottom: "17px"
  },
  mainText: {
    gridRow: "3/4",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
    fontSize: "18px",
    lineHeight: 1.26,
    fontFamily: "ArialMT",
  },
  mainButton: {
    gridRow: "4/5",
    justifySelf: "center",
    alignSelf: "center",
    height: "64px",
    width: "64px"
  },
  context: {
    gridColumn: "2/3",
    backgroundColor: "#ff9200",
  },
  contextMobile: {
    gridRow: "2/3",
    backgroundColor: "#ff9200",
  },
  contextTitle: {
    marginTop: "164px",
    marginLeft: "82px",
    fontSize: "36px",
    color: "#383838",
    fontWeight: "600",
    fontFamily: "Arial-BoldMT",
    marginBottom: "44px"
  },
  contextTitleError: {
    marginTop: "61px",
    marginLeft: "20px",
    fontSize: "36px",
    color: "#383838",
    fontWeight: "600",
    fontFamily: "Arial-BoldMT",
    marginBottom: "44px"
  },
  contextText: {
    marginLeft: "82px",
    marginRight: "81px",
    fontSize: "18px",
    color: "#383838",
    fontFamily: "ArialMT",
    lineHeight: "27.6px"
  },
  contextTextError: {
    marginLeft: "20px",
    marginRight: "20px",
    fontSize: "18px",
    color: "#383838",
    fontFamily: "ArialMT",
    lineHeight: "27.6px"
  },
  fields: {
    gridColumn: "2/3",
    backgroundColor: "#fff",
    height: "100%",
    display: "grid",
    alignItems: "center",
    justifyContent: "center"
  },
  fieldsMobile: {
    backgroundColor: "#fff",
    height: "100%",
    width: "1fr",
    display: "grid",
    alignItems: "center",
    justifyContent: "center"
  },
  cancelButton: {
    backgroundColor: "#f5f8f9",
    width: "158.7px",
    height: "53px",
    borderRadius: "5.3px"
  },
  cancelButtonMobile: {
    backgroundColor: "#f5f8f9",
    width: "280px",
    height: "53px",
    borderRadius: "5.3px"
  },
  submitButton: {
    backgroundColor: "#60e6c5",
    width: "158.7px",
    height: "53px",
    borderRadius: "5.3px"
  },
  submitButtonMobile: {
    backgroundColor: "#60e6c5",
    width: "280px",
    height: "53px",
    borderRadius: "5.3px"
  }

})

const states = {
  init: 0,
  resetFieldsStarted: 1,
  resetFieldsCompleted: 2,
}

class AppView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      activeState: states.init,
      showFields: false,
      resetGenderSelection: false,
      resetMembershipSelection: false,
      name: "",
      date: "",
      mobile: "",
      customerId: "",
      genderSelection: false,
      membershipSelection: false,
      nameError: "",
      dateError: "",
      emailError: "",
      mobileError: "",
      customerIdError: "",
      genderSelectionError: "",
      membershipSelectionError: "",
      cursorOnAvatar: false,
    }
    this.handleFieldDisplay = this.handleFieldDisplay.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.validateFields  = this.validateFields.bind(this)
    this.handleGenderSelectionChange = this.handleGenderSelectionChange.bind(this)
    this.handleMembershipSelectionChange = this.handleMembershipSelectionChange.bind(this)
  }
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidUpdate() {
    if (this.state.activeState === states.resetFieldsStarted) {
      this.setState({
        activeState: states.resetFieldsCompleted,
        resetGenderSelection: false,
        resetMembershipSelection: false
      })
    }
    if (this.state.activeState === states.resetFieldsCompleted) {
      this.setState({
        activeState: states.init,
      })
    }
  }
  handleFieldDisplay() {
    this.setState({
      showFields: !this.state.showFields
    })
  }
  handleFieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
    if (event.target.value !== "") {
      this.setState({
        [name+"Error"]: ""
      })
    }
  }
  handleGenderSelectionChange = name => {
    if (name === 'male') {
      this.setState({
        maleSelection: true,
        femaleSelection: false,
        genderSelection: true,
        genderSelectionError: "",
      })
    }

    if (name === 'female') {
      this.setState({
        maleSelection: false,
        femaleSelection: true,
        genderSelection: true,
        genderSelectionError: ""
      })
    }
  }

  handleMembershipSelectionChange = name => {
    if (name === 'classic') {
      this.setState({
        classicSelection: true,
        goldSelection: false,
        silverSelection: false,
        membershipSelection: true,
        membershipSelectionError: ""
      })
    }

    if (name === 'gold') {
      this.setState({
        classicSelection: false,
        goldSelection: true,
        silverSelection: false,
        membershipSelection: true,
        membershipSelectionError: ""
      })
    }

    if (name === 'silver') {
      this.setState({
        classicSelection: false,
        goldSelection: false,
        silverSelection: true,
        membershipSelection: true,
        membershipSelectionError: ""
      })
    }
  }

  validateFields() {
    Object.keys(this.state).forEach((field) => {
      switch (field) {
        case "name":
          if (this.state[field] === "") {
            this.setState({
              [field+"Error"]: "*Required",
            })
          } else {
            this.setState({
              [field+"Error"]: "",
            })
          }
          break
        case "date":
          if (this.state[field] === "") {
            this.setState({
              [field+"Error"]: "*Required",
            })
          } else {
            this.setState({
              [field+"Error"]: "",
            })
          }
          break
        case "email":
          if (this.state[field] === "") {
            this.setState({
              [field+"Error"]: "*Required",
            })
          } else {
            this.setState({
              [field+"Error"]: "",
            })
          }
          break
        case "mobile":
          if (this.state[field] === "") {
            this.setState({
              [field+"Error"]: "*Required",
            })
          } else {
            this.setState({
              [field+"Error"]: "",
            })
          }
          break
        case "customerId":
          if (this.state[field] === "") {
            this.setState({
              [field+"Error"]: "*Required",
            })
          } else {
            this.setState({
              [field+"Error"]: "",
            })
          }
          break
        case "genderSelection":
          if (this.state[field] === false) {
            this.setState({
              [field+"Error"]: "*Required",
            })
          } else {
            this.setState({
              [field+"Error"]: "",
            })
          }
          break
        case "membershipSelection":
          if (this.state[field] === false) {
            this.setState({
              [field+"Error"]: "*Required",
            })
          } else {
            this.setState({
              [field+"Error"]: "",
            })
          }
          break
        default:
      }
    })
  }

  handleCancel() {
    if (this.state.activeState === states.init) {
      this.setState({
        showFields: true,
        name: "",
        date: "",
        mobile: "",
        customerId: "",
        email: "",
        nameError: "",
        dateError: "",
        emailError: "",
        mobileError: "",
        customerIdError: "",
        genderSelectionError: "",
        membershipSelectionError: "",
        maleSelection: false,
        femaleSelection: false,
        classicSelection: false,
        goldSelection: false,
        silverSelection: false,
        resetGenderSelection: true,
        resetMembershipSelection: true,
        genderSelection: false,
        membershipSelection: false,
        activeState: states.resetFieldsStarted,
      })
    }
  }

  render() {
    const { classes } = this.props
    const { showFields, width, cursorOnAvatar } = this.state
    const isMobile = width <= 500;
    let rootClass
    let mainClass
    let contextClass
    let contextTitleClass
    let contextTextClass
    let fields
    let transitionsFeilds
    let transitionAvatar = {
      defaultStyle: {
        transform: "scale(1)",
      },
      enterStyle: {
        transform: transit("scale(1.2)", 250, "ease-in-out"),
      },
      leaveStyle: {
        transform: transit("scale(1)", 250, "ease-in-out"),
      },
      activeStyle: {
        transform: "scale(1.2)",
      },
    }
    if (isMobile) {
      rootClass = classes.rootMobile
      mainClass = classes.mainMobile
      contextClass = classes.contextMobile
      contextTitleClass = classes.contextTitleError
      contextTextClass = classes.contextTextError
      fields = classes.fieldsMobile
      transitionsFeilds = {
        defaultStyle: {
          transform: "translate(0, 0)",
        },
        enterStyle: {
          transform: transit("translate(0, -892px)", 250, "ease-in-out"),
        },
        leaveStyle: {
          transform: transit("translate(0, 0)", 250, "ease-in-out"),
        },
        activeStyle: {
          transform: "translate(0, -892px)",
        },
      }
    } else {
      rootClass = classes.root
      mainClass = classes.main
      contextClass = classes.context
      contextTitleClass = classes.contextTitle
      contextTextClass = classes.contextText
      fields = classes.fields
      transitionsFeilds = {
        defaultStyle: {
          transform: "translate(0, 0)",
        },
        enterStyle: {
          transform: transit("translate(-583px, 0)", 250, "ease-in-out"),
        },
        leaveStyle: {
          transform: transit("translate(0, 0)", 250, "ease-in-out"),
        },
        activeStyle: {
          transform: "translate(-583px, 0)",
        },
      }

    }
    return (
        <div className={classes.wrapper}>
          <div className={rootClass}>
            <div className={mainClass}>
              <div
                  onMouseEnter={(e) => {
                    e.currentTarget.style.cursor = "pointer"
                    this.setState({
                      cursorOnAvatar: true,
                    })
                  }}
                  onMouseLeave={(e) => {
                    this.setState({
                      cursorOnAvatar: false,
                    })
                  }}
                  className={classes.mainAvatar}
              >
                <CSSTransition
                    {...transitionAvatar} active={cursorOnAvatar}
                >
                 <img src={avatar}/>
                </CSSTransition>
              </div>
              <div className={classes.mainTitle}>
                Front-end challenge!
              </div>
              <div className={classes.mainText}>
                This is a design that you will need to code up and impress us.
              </div>
              <div
                  className={classes.mainButton}
                  onMouseEnter={(e) => e.currentTarget.style.cursor = "pointer"}
                  onClick={this.handleFieldDisplay}
              >
                {!showFields &&
                <div>
                  {isMobile &&
                  <img src={downArrow}/>
                  }
                  {!isMobile &&
                  <img src={leftArrow}/>
                  }
                </div>
                }
                {showFields &&
                <div>
                  {isMobile &&
                  <img src={upArrow}/>
                  }
                  {!isMobile &&
                  <img src={rightArrow}/>
                  }
                </div>
                }
              </div>
            </div>
            <div className={contextClass}>
              <div className={contextTitleClass}>
                My World Today
              </div>
              <div className={contextTextClass}>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
                  feugiat vitae, ultricies eget, tempor sit amet, ante. {<a href={""} style={{color: "#383838", fontWeight: "600"}}>View all days</a>} eu libero sit amet quam egestas semper. Aenean ultricies
                  mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi,
                  condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
                  orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus
                  faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat
                </p>
              </div>
            </div>
            <CSSTransition
                {...transitionsFeilds} active={showFields}
            >
              <div className={fields}>
                <Grid
                    container
                    justify={'center'}
                    alignItems={'center'}
                >
                  <Grid item  xs={12} md={12} lg={12}>
                    <Grid containerdirection={'column'} spacing={16}>
                      <Grid item>
                        <CustomTextField
                            onClick={this.handleFieldChange('name')}
                            label={"Name"} type={"text"}
                            value={this.state.name}
                            placeholder={"John Doe"}
                            error={this.state.nameError}
                        />
                      </Grid>
                      <Grid item>
                        <GenderSelector
                            onClick={this.handleGenderSelectionChange}
                            maleSelection={this.state.maleSelection}
                            femaleSelection={this.state.femaleSelection}
                            label={"Gender"}
                            error={this.state.genderSelectionError}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                            onClick={this.handleFieldChange('date')}
                            label={"Date of Birth"}
                            value={this.state.date}
                            type={"date"}
                            error={this.state.dateError}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                            onClick={this.handleFieldChange('email')}
                            label={"Email"}
                            type={"text"}
                            value={this.state.email}
                            placeholder={"foo@bar.io"}
                            error={this.state.emailError}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                            onClick={this.handleFieldChange('mobile')}
                            label={"Mobile"}
                            type={"number"}
                            value={this.state.mobile}
                            placeholder={"+91 98765 43210"}
                            error={this.state.mobileError}
                        />
                      </Grid>
                      <Grid item>
                        <CustomTextField
                            onClick={this.handleFieldChange('customerId')}
                            label={"Customer ID"}
                            type={"text"}
                            value={this.state.customerId}
                            placeholder={"576802-ERD0348 45"}
                            error={this.state.customerIdError}
                        />
                      </Grid>
                      <Grid item>
                        <MembershipSelector
                            classicSelection={this.state.classicSelection}
                            goldSelection={this.state.goldSelection}
                            silverSelection={this.state.silverSelection}
                            onClick={this.handleMembershipSelectionChange}
                            label={"Membership"}
                            error={this.state.membershipSelectionError}

                        />
                      </Grid>
                      <Grid item>
                        {isMobile &&
                        <Grid container direction={'column'}  justify={'center'}  alignItems={'center'} spacing={24} style={{paddingTop: "39px"}}>
                          <Grid item>
                            <Button
                                className={classes.cancelButtonMobile}
                                onClick={this.handleCancel}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                                className={classes.submitButtonMobile}
                                onClick={this.validateFields}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                        }
                        {!isMobile &&
                        <Grid container justify={'flex-end'} spacing={24}
                              style={{paddingTop: "83px"}}>
                          <Grid item>
                            <Button
                                className={classes.cancelButton}
                                onClick={this.handleCancel}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                                className={classes.submitButton}
                                onClick={this.validateFields}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                        }

                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </CSSTransition>
          </div>
        </div>

    );
  }
}

AppView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppView);
