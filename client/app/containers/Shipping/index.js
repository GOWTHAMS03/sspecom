

import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from '../../actions';
import { Row, Col } from 'reactstrap';

import Checkbox from '../../components/Common/Checkbox';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

import SubPage from '../../components/Manager/SubPage';

const Shipping = props => {


  const { addressFormData, formErrors, addressChange, addAddress, history, address } = props;

  console.log(history, "history")
  console.log(address, "address")
  console.log(addAddress, "addaddress")


  const handleSubmit = event => {
    event.preventDefault();
    addAddress(history); // pass history as an argument
  };

  return (
    <SubPage
      title='Add Address'
      actionTitle='Cancel'
      handleAction={() => history.goBack()}
    >
      <div className='add-address'>
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col xs='12' md='12'>
              <Input
                type={'text'}
                error={formErrors['address']}
                label={'Address'}
                name={'address'}
                placeholder={'Address: Street, House No / Apartment No'}
                value={addressFormData.address}
                onInputChange={(name, value) => {
                  addressChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                type={'number'}
                error={formErrors['phonenumber']}
                label={'Phone Number'}
                name={'phonenumber'}
                placeholder={'enter your phone number'}
                value={addressFormData.phonenumber}
                onInputChange={(name, value) => {
                  addressChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                type={'text'}
                error={formErrors['city']}
                label={'City'}
                name={'city'}
                placeholder={'City'}
                value={addressFormData.city}
                onInputChange={(name, value) => {
                  addressChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' lg='6'>
              <Input
                type={'text'}
                error={formErrors['state']}
                label={'State'}
                name={'state'}
                placeholder={'State'}
                value={addressFormData.state}
                onInputChange={(name, value) => {
                  addressChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' lg='6'>
              <Input
                type={'text'}
                error={formErrors['country']}
                label={'Country'}
                name={'country'}
                placeholder={'Please Enter Your country'}
                value={addressFormData.country}
                onInputChange={(name, value) => {
                  addressChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' lg='6'>
              <Input
                type={'text'}
                error={formErrors['zipCode']}
                label={'Zipcode'}
                name={'zipCode'}
                placeholder={'Please Enter Your Zipcode'}
                value={addressFormData.zipCode}
                onInputChange={(name, value) => {
                  addressChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' md='12'>
              <Checkbox
                id={'default'}
                label={'As the Default'}
                name={'isDefault'}
                checked={addressFormData.isDefault}
                onChange={(name, value) => {
                  addressChange(name, value);
                }}
              />
            </Col>
          </Row>
          <hr />
          <div className='add-address-actions'>
            <Button type='submit' text='Add Address' />
          </div>
        </form>
      </div>
    </SubPage>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    addressFormData: state.address.addressFormData,
    formErrors: state.address.formErrors,
    history: ownProps.history
  };
};


export default withRouter(connect(mapStateToProps, actions)(Shipping));
