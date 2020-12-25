import React from 'react'
import { graphql, useStaticQuery , Link } from "gatsby"

import Layout from '../components/layout'

const BlogPage = () => {

  //   const data = useStaticQuery(graphql`
  //           query {
  //           allMarkdownRemark{
  //             edges{
  //               node{
  //                 frontmatter{
  //                   title,
  //                   date
  //                 },
            
  //                 excerpt,
  //                 fields{
  //                   slug
  //                 }
  //               }
  //             }
  //           }
  //       }
  // `) 

  const data = useStaticQuery( graphql`
          query {
            allContentfulBlogPost(sort: {fields: publishDate, order: DESC}) {
              edges {
                node {
                  slug
                  title
                  publishDate(formatString: "MMMM Do, YYYY")
                }
              }
            }
          }          
  `)

const holder = {
  marginTop : 10,
  padding:20 , 
  background:'#f5f5dc',
  border:'1px solid'
}

const link = {
  color:'black',
  fontFamily : "'Roboto Slab', serif" , 
  textDecoration:'none', 
  textAlign : 'center'
}

let posts =   data.allContentfulBlogPost.edges 
// const posts =   data.allMarkdownRemark.edges
posts = posts.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)

    return (
        <Layout>
            <h1>Blog</h1>
            <p>Posts will show up here later on.</p>

            {
                posts && posts.map(post => 
                <div style={holder}>
                    <Link to={`/blog/${post.node.slug}`} style={link}> 
                      <h1>{post.node.title}</h1> 
                      <h5>{post.node.createdAt}</h5> 

                    </Link>                  
                </div>
                )
            }
        </Layout>
    )
}

export default BlogPage


// {
//   allContentfulBlogPost {
//     edges {
//       node {
//         slug
//         contentful_id
//         title
//         body {
//           raw
//         }
//       }
//     }
//   }
// }
