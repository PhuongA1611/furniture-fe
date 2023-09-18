import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Account.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProvince } from '../../app/OrderSlice';
import { DropdownButton } from 'react-bootstrap';
import { useRef } from 'react';
import { createShipping, deleteShipping, updateShipping } from '../../app/UserSlice';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const addressSchema = yup.object().shape({
  fullName: yup.string().required('This field is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('This field is required'),
  province: yup.string().required('This field is required'),
  district: yup.string().required('This field is required'),
  ward: yup.string().required('This field is required'),
  address: yup.string().required('This field is required'),
})

const AddressDetail = () => {
  const { addressId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(state => state.auth.userId);
  const listShipping = useSelector(state => state.user.shipping);
  const [location, setLocation] = useState(null)
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const provinceBtnRef = useRef();
  const districtBtnRef = useRef();
  const wardBtnRef = useRef();
  const submitRef = useRef();
  const [provinceValue, setProvinceValue] = useState({
    code: null,
    name: null,
  });
  const [districtValue, setDistrictValue] = useState({
    code: null,
    name: null,
  });
  const [wardValue, setWardValue] = useState({
    code: null,
    name: null,
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(addressSchema),
  });

  useEffect(() => {
    try {
      dispatch(getProvince()).unwrap().then(data => {
        setLocation(data);
        setListProvince(data.map((item, index) => {
          return {
            code: item.code,
            name: item.name
          }
        }))
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (provinceValue && location) {
      const provinceData = location.find(item => item.code === provinceValue.code);
      setListDistrict(provinceData.districts.map((item, index) => {
        return {
          code: item.code,
          name: item.name
        }
      }))
    }
  }, [provinceValue])

  useEffect(() => {
    if (provinceValue && districtValue && location) {
      const provinceData = location.find(item => item.code === provinceValue.code);
      const data = provinceData.districts.find(item => item.code === districtValue.code);
      if (data) {
        setListWard(data.wards.map((item, index) => {
          return {
            code: item.code,
            name: item.name
          }
        }))
      }
    }
  }, [districtValue])

  useEffect(() => {
    if (addressId && listShipping && location) {
      const addressEdit = listShipping.find(item => item.id == addressId);
      console.log(addressEdit);
      setValue('fullName', addressEdit.fullName);
      setValue('phone', addressEdit.phone);
      const provinceEdit = location.find(item => item.name === addressEdit.province);
      setProvinceValue({
        code: provinceEdit.code,
        name: provinceEdit.name,
      });
      setValue('province', addressEdit.province);
      const districtEdit = provinceEdit.districts.find(item => item.name === addressEdit.district);
      setDistrictValue({
        code: districtEdit.code,
        name: districtEdit.name,
      });
      setValue('district', addressEdit.district);
      const wardEdit = districtEdit.wards.find(item => item.name === addressEdit.ward);
      setWardValue({
        code: wardEdit.code,
        name: wardEdit.name,
      });
      setValue('ward', addressEdit.ward);
      setValue('address', addressEdit.address);
    }
  }, [addressId, location])

  const handleProvince = (province) => {
    if (province) {
      setProvinceValue(province);
      setValue('province', province.name);
      provinceBtnRef.current.classList.remove("show");
      provinceBtnRef.current.firstChild.classList.remove("show");
      provinceBtnRef.current.firstChild.ariaExpanded = "false";
      provinceBtnRef.current.lastChild.classList.remove("show");
    }
  }
  const handleDistrict = (district) => {
    if (district) {
      setDistrictValue(district);
      setValue('district', district.name);
      districtBtnRef.current.classList.remove("show");
      districtBtnRef.current.firstChild.classList.remove("show");
      districtBtnRef.current.firstChild.ariaExpanded = "false";
      districtBtnRef.current.lastChild.classList.remove("show");
    }
  }
  const handleWard = (ward) => {
    if (ward) {
      setWardValue(ward);
      setValue('ward', ward.name);
      wardBtnRef.current.classList.remove("show");
      wardBtnRef.current.firstChild.classList.remove("show");
      wardBtnRef.current.firstChild.ariaExpanded = "false";
      wardBtnRef.current.lastChild.classList.remove("show");
    }
  }

  const handleDelete = () => {
    try {
      const id = addressId;
      dispatch(deleteShipping(addressId)).unwrap().then((data) => {
        if (data && data.message) {
          message.success(data.message);
        }
        navigate(-1);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = params => {
    console.log(params);
    console.log(userId);
    console.log(addressId);

    try {
      if (addressId) {
        const id = addressId;
        dispatch(updateShipping({ id, params })).unwrap().then((data) => {
          message.success(data.message);
          navigate(-1);
        });
      } else {
        dispatch(createShipping({ userId, params })).unwrap().then((data) => {
          message.success(data.message);
          navigate(-1);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='account__address-detail'>
      <h2>Shipping Address</h2>
      {
        addressId &&
        <button className='delete-btn' onClick={handleDelete}>Delete</button>
      }
      <form onSubmit={handleSubmit(onSubmit)} className='account__form__grid'>
        <div className='account__form__group'>
          <label>Full Name <span>*</span></label>
          <input {...register("fullName")} type='text' name='fullName' />
          {errors.fullName && <span className='error'>{errors.fullName?.message}</span>}
        </div>
        <div className='account__form__group'>
          <label>Phone <span>*</span></label>
          <input {...register("phone")} type='text' name='phone' />
          {errors.phone && <span className='error'>{errors.phone?.message}</span>}
        </div>
        <div className='account__form__group'>
          <label>Province <span>*</span></label>
          <input className='input-hidden' {...register("province")} type='text' name='province' />
          <DropdownButton
            title={<span>{provinceValue.name}</span>
            }
            className='dropdown-btn'
            id="dropdown-btn-province"
            ref={provinceBtnRef}
          >
            <ul>
              {
                listProvince && listProvince.map((province, index) => (
                  <li key={index}>
                    <a onClick={() => handleProvince(province)}>{province.name}</a>
                  </li>
                ))
              }
            </ul>
          </DropdownButton>
          {errors.province && <span className='error'>{errors.province?.message}</span>}
        </div>
        <div className='account__form__group'>
          <label>District <span>*</span></label>
          <input className='input-hidden' {...register("district")} type='text' name='district' />
          <DropdownButton
            title={<span>{districtValue.name}</span>
            }
            className='dropdown-btn'
            id="dropdown-btn-district"
            ref={districtBtnRef}
          >
            <ul>
              {
                listDistrict && listDistrict.map((district, index) => (
                  <li key={index}>
                    <a onClick={() => handleDistrict(district)}>{district.name}</a>
                  </li>
                ))
              }
            </ul>
          </DropdownButton>
          {errors.district && <span className='error'>{errors.district?.message}</span>}
        </div>
        <div className='account__form__group'>
          <label>Ward <span>*</span></label>
          <input className='input-hidden' {...register("ward")} type='text' name='ward' />
          <DropdownButton
            title={<span>{wardValue.name}</span>
            }
            className='dropdown-btn'
            id="dropdown-btn-district"
            ref={wardBtnRef}
          >
            <ul>
              {
                listWard && listWard.map((ward, index) => (
                  <li key={index}>
                    <a onClick={() => handleWard(ward)}>{ward.name}</a>
                  </li>
                ))
              }
            </ul>
          </DropdownButton>
          {errors.ward && <span className='error'>{errors.ward?.message}</span>}
        </div>
        <div className='account__form__group'>
          <label>Address <span>*</span></label>
          <input {...register("address")} type='text' name='address' />
          {errors.address && <span className='error'>{errors.address?.message}</span>}
        </div>
        <div className='account__form__group'>
          <input ref={submitRef} type="submit" name='submit' value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default AddressDetail
