import React from 'react';
import { Form, Input, Tooltip, Button, Icon, Card, message } from 'antd';
const FormItem = Form.Item;
const axios = require('axios');
const history = (require('history').createBrowserHistory)();

class RegistrationForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                axios.post("https://reqres.in/api/register",
                    {
                        "email": values.email,
                        "password": values.password,
                        "name": values.name
                    }
                ).then(
                    (res) => {
                        console.log("response returned from server: ", res);
                        this.notifySuccess('Successfully Registered as: ' + values.email + "\n Redirecting to Landing page");
                        setTimeout(() => {
                            history.push('/');
                            history.go();
                        }, 2000);

                    }
                    ).catch(
                    (error) => {
                        console.log("error occured ", error);
                        this.notifyError("oh ho! Something went wrong");
                    }
                    );
            } else {
                console.log('Something wrong with the UI ', err);
                this.notifyError("Registration Failed");
            }
        });
    };
    notifySuccess = (msg) => {
        message.success(msg);
    };

    notifyError = (msg) => {
        message.error(msg);
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div className="v-centered">
                <Card hoverable title="Register" className="registerFormCardStyle h-centered">
                    <div className="formCardContentStyle">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="E-mail"
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                        required: true, message: 'Please input your E-mail!',
                                    }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Password"
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }],
                                })(
                                    <Input type="password" />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Confirm Password"
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: 'Please confirm your password!',
                                    }, {
                                        validator: this.checkPassword,
                                    }],
                                })(
                                    <Input type="password" />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                        Name&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                )}
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input your Name!', whitespace: true }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Register</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Form.create()(RegistrationForm);