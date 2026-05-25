import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import Profile from '../../Pages/Profile';

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const authenticated = useSelector((state) => state.authenticated);
  const [profileVisible, setProfileVisible] = useState(false);

  const handleLogout = () => {
    // Dispatch the LOGOUT action to Redux store
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <>
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem >
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem className='d-flex gap-2 align-items-center'  onClick={handleLogout}>
        <RiLogoutCircleRLine className='m-0 p-0' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    <Profile visible={profileVisible} onClose={() => setProfileVisible(!profileVisible)} />
    </>
  )
}

export default AppHeaderDropdown
