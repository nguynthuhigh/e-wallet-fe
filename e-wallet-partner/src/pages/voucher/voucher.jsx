import React from 'react'
import SideBar from '../../components/dashboard/sidebar'
import { ItemVoucherLoading,ItemVoucher } from '../../components/voucher/item_voucher'
import { Link } from 'react-router-dom'
import HeaderDashboard from '../../components/header/header_dashboard'
import partnerAPI from '../../api/partner.api'
import { useQuery } from '@tanstack/react-query'
const Voucher = () => {
    const {data,isLoading} = useQuery({
        queryFn: async()=>{
            const response = await partnerAPI.getVouchers()
            return response.data.data
        },
        queryKey:['voucher']
    })
  return (
    <div className='flex'>
        <SideBar state="Vouchers"></SideBar>
        <div className='w-full p-4'>
            <div className='flex items-center'>
                <HeaderDashboard title='Vouchers' description='Access & manage your account and transactions efficiently.'></HeaderDashboard>
                <Link to='/add-voucher' className='ml-auto border-2 font-bold text-gray-400 p-2 rounded-lg px-3 border-gray-400 hover:border-white hover:bg-blue-700 hover:text-white'>Add new voucher</Link>
            </div>
            <div className='grid gap-4 grid-cols-5 grid-flow-row'>
                {isLoading ? <ItemVoucherLoading></ItemVoucherLoading> : data.map((item,key)=>(
                    <ItemVoucher data={item} key={key}></ItemVoucher>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Voucher