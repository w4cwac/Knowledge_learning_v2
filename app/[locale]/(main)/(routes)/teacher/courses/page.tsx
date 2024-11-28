import { getCourses } from '@/data'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

const page = async() => {

  const courses = await getCourses()
  return (
    <div className='p-6'>
        <DataTable data={courses} columns={columns}/>
    </div>
  )
}

export default page