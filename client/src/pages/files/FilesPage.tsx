import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import docImg from '../../img/document.png'
import batImg from '../../img/bat.png'
import backBtnImg from '../../img/previous.png'

const FilesPage = () => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <div className='w-[130px] h-[120px] flex flex-col items-center'>
                <NavLink className='w-[64px]' to='/files/cert_export_CA.sokolmed.itl-service.ru.p12' target="_blank" download>
                    <div className='flex flex-col items-center hover:opacity-80 hover:cursor-pointer'>
                        <img className='w-[64px]' src={docImg} alt=""></img>
                        <p className='w-[100px] text-center'>Сертификат СоколМед</p>
                    </div>
                </NavLink>
            </div>

            <div className='w-[130px] h-[120px] flex flex-col items-center'>
                <NavLink className='w-[64px]' to='/files/rdp-cdt2.bat' target="_blank" download>
                    <div className='flex flex-col items-center hover:opacity-80 hover:cursor-pointer'>
                        <img className='w-[64px]' src={batImg} alt=""></img>
                        <p className='w-[120px] text-center'>rdp-cdt2.bat</p>
                    </div>
                </NavLink>
            </div>

            <div className='w-[130px] h-[120px] flex flex-col items-center'>
                <NavLink className='w-[64px]' to='/files/rdp-ldc2.bat' target="_blank" download>
                    <div className='flex flex-col items-center hover:opacity-80 hover:cursor-pointer'>
                        <img className='w-[64px]' src={batImg} alt=""></img>
                        <p className='w-[120px] text-center'>rdp-ldc2.bat</p>
                    </div>
                </NavLink>
            </div>

            <NavLink to='/admin' className='bigLeftBackBtnContainer'>
                <img src={backBtnImg} alt="" />
            </NavLink>
        </div>
    );
};

export default FilesPage;



            {/* шаблон */}            
            {/* <div className='w-[120px] flex flex-col items-center'>
                <NavLink className='w-[64px]' to='/files/' target="_blank" download>
                    <div className='flex flex-col items-center hover:opacity-80 hover:cursor-pointer'>
                        <img className='w-[64px]' src={batImg} alt=""></img>
                        <p className='w-[120px] text-center'>Какой-нибудь батник</p>
                    </div>
                </NavLink>
            </div> */}