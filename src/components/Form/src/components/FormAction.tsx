/*
 * @Author: E-Dreamer
 * @Date: 2022-08-11 13:54:08
 * @LastEditTime: 2022-08-12 14:41:46
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { Button, Col, Form } from 'antd'
import PropTypes from 'prop-types'
import { FormActionProps } from '../types/form'
// FormActionProps
const FormAction = (props: any) => {
  const {
    actionColOptions,
    showActionButtonGroup,
    showResetButton,
    showSubmitButton,
    submitButtonOptions,
    resetButtonOptions,
    resetAction,
    submitAction,
  } = props
  const getSubmitBtnOptions = () => {
    return Object.assign(
      {
        text: '确定',
      },
      submitButtonOptions
    )
  }
  const getResetBtnOptions = () => {
    return Object.assign(
      {
        text: '重置',
      },
      resetButtonOptions
    )
  }
  const rendAll = () => {
    return (
      <Col {...actionColOptions}>
        <Form.Item>
          {showResetButton && (
            <Button
              type="error"
              {...getResetBtnOptions()}
              onClick={resetAction}
            >
              {getResetBtnOptions().text}
            </Button>
          )}
          {showSubmitButton && (
            <Button
              type="primary"
              className='ml15'
              {...getSubmitBtnOptions()}
              onClick={submitAction}
            >
              {getSubmitBtnOptions().text}
            </Button>
          )}
        </Form.Item>
      </Col>
    )
  }
  return <>{showActionButtonGroup && rendAll()}</>
}
FormAction.propTypes = {
  showActionButtonGroup: PropTypes.bool,
  showResetButton: PropTypes.bool,
  showSubmitButton: PropTypes.bool,
  showAdvancedButton: PropTypes.bool,
  actionColOptions: PropTypes.object,
  resetButtonOptions: PropTypes.object,
  submitButtonOptions: PropTypes.object,
  actionSpan: PropTypes.number,
  isAdvanced: PropTypes.bool,
  hideAdvanceBtn: PropTypes.bool,
  resetAction: PropTypes.func,
  submitAction: PropTypes.func,
}

FormAction.defaultProps = {
  showActionButtonGroup: true,
  showResetButton: true,
  showSubmitButton: true,
  showAdvancedButton: true,
  resetButtonOptions: {},
  submitButtonOptions: {},
  actionColOptions: {
    span: 8,
  },
  actionSpan: 6,
  resetAction: () => { },
  submitAction: () => { },
}
export default FormAction
