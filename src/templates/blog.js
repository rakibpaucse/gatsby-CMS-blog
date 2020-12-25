import React from 'react'
import Layout from '../components/layout';
import { graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from "@contentful/rich-text-types"

export const query = graphql`
query(
    $slug : String!
  ){
    contentfulBlogPost(slug : { eq : $slug}) {
      body {
        raw
        references {
          file {
            fileName
            url
          }
        }
      }
      title
      publishDate(formatString: "MMMM Do, YYYY")
    }
  }    
`

 
const EachBlog = (props) => {
// console.log(props.data.contentfulBlogPost.body.references[0].file.url);

  const options = {
    renderNode : {

     

      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        props.data.contentfulBlogPost.body.references[0].file.url && 
        <img src={`https:${props.data.contentfulBlogPost.body.references[0].file.url}`}  alt ='' />
      )
    }
  }

  

    return (
        <Layout>
            <h1>{props.data.contentfulBlogPost.title}</h1>
            <h5>{props.data.contentfulBlogPost.publishDate}</h5>
            {/* <p>{props.data.markdownRemark.excerpt}</p>    */}
            {/* <div dangerouslySetInnerHTML={{ __html : props.data.contentfulBlogPost.body.raw}}></div>         */}

            {
              documentToReactComponents(JSON.parse(props.data.contentfulBlogPost.body.raw) , options )
            }
        </Layout>
    )
}

export default EachBlog


// query(
//   $slug : String!
// ){
//   markdownRemark(
//     fields:{
//       slug:{
//         eq : $slug
//       }
//     }
//   ){
//     frontmatter{
//       title
//       date
//     },
//     excerpt
//     html
//   }
// }