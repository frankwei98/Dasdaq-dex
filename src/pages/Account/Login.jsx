import React from "react"
import { Form, Icon, Input, Button, Checkbox, Modal, notification, Card, Row, Col, Alert } from 'antd';
import { NavLink } from "react-router-dom";
import intl from "react-intl-universal";
import { login, getMyInfo, loginByMetaMask, loginByScatter } from "../../api/auth";
import IconFont from "../../components/IconFont";
import withContent from "../ContentWrapper";
import { compose } from "ramda";
import { withScatter } from "../../scatter";

const i18n = (name) => intl.get(`user.login.${name}`)


const FormItem = Form.Item;

const IconFactory = (type) => (
  <Icon type={type} style={{ color: 'rgba(0,0,0,.25)' }} />
)

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isLoadedPlugin: {
        scatter: false,
        metamask: false
      }
    }
  }

  async componentDidMount() {
    if (this.props.user !== null) {
      this.jumpToUserPanel()
    }
  }

  async componentDidUpdate() {
    if (this.props.user !== null) {
      this.jumpToUserPanel()
    }
  }

  jumpToUserPanel() {
      this.props.history.push("/account/info");
  }

  async requestIdAndSignWithScatter() {
    await this.requestIdentity()
    try {
      const signature = await this.getSignatureWithScatter()
      console.info('signature ' + signature)
      const result = await loginByScatter({ signature })
      // console.log(result)
      this.props.saveUser(result)
      notification.success({
        message: 'Login successfully',
        description: 'We will redirect to previous page in no time.'
      })
    } catch (error) {
      notification.error({
        message: error.message
      })
    }
  }

  async requestIdentity() {
    const { scatter } = this.props
    try {
      const identity = await scatter.getIdentity()
      this.setState({ identity })
    } catch (error) {
      console.error(error.message)
    }
  }

  async getSignatureWithScatter() {
    const { scatter } = this.props
    if (!this.state.identity) {
      return null;
    }
    const { publicKey } = this.state.identity
    const signMsg = "By Signing, you will bind your Scatter identity with your account."
    return scatter.getArbitrarySignature(
      publicKey, signMsg, 'Login Authentication', false)

  }

  render() {
    const { user } = this.props
    if (user !== null) {
      return (
        <div className="login-ok">
          <Card title={i18n("usesign")}>
            {i18n("islogin")} <Button size="large"><NavLink to="/account/info"> {i18n("myaccount")} </NavLink></Button>
          </Card>
        </div>
      )
    } else {
      return (
        <Row>
          <Col md={12} xs={24}>
            <Card title={i18n("usesign")} style={{ margin: "1rem" }}>
              <Alert
                message={
                  <div> <IconFont name="metamask" /> MetaMask
                    {i18n("signor")} <IconFont name="scatter" /> Scatter {i18n("walletsign")} </div>
                }
                type="info" description={i18n("dontusepw")}
                showIcon iconType="key"
                style={{ marginBottom: "1rem" }}
              />
              {/* <Button.Group> */}
                <Button size="large" disabled={!this.props.scatter}
                  onClick={e => this.requestIdAndSignWithScatter(e)}>
                  <IconFont name="scatter" /> Scatter {i18n("signin")}</Button>
              {/* </Button.Group> */}
            </Card>
          </Col>
        </Row>
      );
    }

  }
}

const style = {
  container: {
    // maxWidth: '36rem',
    padding: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default compose(
  withContent,
  withScatter
)(Login);
