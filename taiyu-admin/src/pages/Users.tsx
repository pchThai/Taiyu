import React from 'react'
import Nav from '../components/Nav'
import Menu from '../components/Menu'
import { Layout } from '../components/Layout'
export const Users = () => {
  return (
    <div>
      <Layout>    
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Header</th>
              <th scope="col">Header</th>
              <th scope="col">Header</th>
              <th scope="col">Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,001</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
            </tr>
          </tbody>
        </table>
      </Layout>  
    </div>
  )
}
