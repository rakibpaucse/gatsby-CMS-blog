import React from 'react'
import Layout from '../components/layout';
import { graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from "@contentful/rich-text-types"

// import { renderRichText } from "gatsby-source-contentful/rich-text"
// import Img from "gatsby-image"

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

 
const EachBlog = ({data}) => {

  const {title , publishDate , body } = data.contentfulBlogPost

console.log(body.references);

  const options = {
    renderNode : {
      [BLOCKS.EMBEDDED_ASSET]: (node) => ( 
        body.references && 
        body.references.map(nd => (
          <img src={`https:${nd.file.url}`}  alt ='' style={{border:'2px solid'}}/>
        ))
      )
      // [BLOCKS.EMBEDDED_ASSET]: node => <Img {...node.data.target} />,     
    }
  }

    return (
        <Layout>
            <h1>{title}</h1>
            <h5>{publishDate}</h5>
            {/* <p>{props.data.markdownRemark.excerpt}</p>    */}
            {/* <div dangerouslySetInnerHTML={{ __html : props.data.contentfulBlogPost.body.raw}}></div>         */}

            {
              documentToReactComponents(JSON.parse(body.raw) , options )
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