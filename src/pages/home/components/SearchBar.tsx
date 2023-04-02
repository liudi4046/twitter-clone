import React, { Dispatch, SetStateAction } from "react"
import { Input, Space } from "antd"
const { Search } = Input

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void
}) {
  return (
    <div className="my-3">
      <Search
        placeholder="输入用户名查找贴文，例如：Sara Andersen"
        allowClear
        enterButton="Search"
        color="red"
        size="large"
        onSearch={onSearch}
      />
    </div>
  )
}
