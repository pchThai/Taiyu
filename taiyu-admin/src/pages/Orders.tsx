import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout'
import { Order } from '../models/order'

export const Orders = () => {
  const[orders, setOrders] = useState<Order[]>([]);
  const {id} = useParams();
  useEffect(()=>{
    (async () => {
      await fetch(`http://localhost:8000/api/admin/orders`,{credentials:'include'})
      .then(response => response.json())
      .then(data => setOrders(data))
    })()
},[])
  return (
    <Layout>
      {orders.map(order =>{
        return(
          <Accordion key={order.id}>
              <AccordionSummary>
                {order.name} ${order.total}
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                    <TableHead>
                      <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Product Title</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.order_items.map(item => {
                        return(
                         <TableRow key={item.id}>
                         <TableCell>{item.id}</TableCell>
                         <TableCell>{item.product_title}</TableCell>
                         <TableCell>{item.quantity}</TableCell>
                     </TableRow>)
                      })}
                    </TableBody>
                </Table>
              </AccordionDetails>
          </Accordion>
        )
      })}
    </Layout>
  )
}
