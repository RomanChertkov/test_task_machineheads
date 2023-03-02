import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/posts">
        <Button type="primary">Вернутся к постам</Button>
      </Link>
    }
  />
)

export default NotFoundPage
