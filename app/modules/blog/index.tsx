import { useState } from "react"
import { Post } from "~/models/post.server"
import BlogPost from '~/components/post'
import { formatDateTime } from "~/utils"

const TAGS = ['Java Script', 'Node', 'React']

export default function Blog({posts}: Post) {
    const [activeFilter, setActiveFilter] = useState('all')
    const [search, setSearch] = useState('')

    return <section className="flex justify-between">
      <div className="w-full max-w-sm">
        <form method="post">
            <input type="search" placeholder="Search a post" value={search} onChange={(e) => {setSearch(e.target.value)}} />
        </form>
        <ul>
          {TAGS.map(tag => <li key={tag}><button className={tag === activeFilter ? 'border-2' : 'border-0'} onClick={() => {
            if(activeFilter === tag) return setActiveFilter('all')
            return setActiveFilter(tag)
          }}>{tag}</button></li>)}
        </ul>
      </div>

    <div className="flex w-full max-w-3xl flex-wrap divide-y-2">
    {posts.map(({ id, title, content, createdAt, tags }: Post) => {
        if(activeFilter === 'all' || tags.includes(activeFilter)) {
            return title.includes(search) && <div className="w-full mb-4 py-4" key={id}
            ><BlogPost
            to={id}
            title={title}
            description={content}
            createdAt={formatDateTime(new Date(createdAt))}
            tags={tags}
          /></div>
        }
    } 
    )}
  </div>
</section> 
}