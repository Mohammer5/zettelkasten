import PropTypes from 'prop-types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import gfm from 'remark-gfm'
import styles from './Markdown.module.scss'

const components = {
  // eslint-disable-next-line react/prop-types
  code({inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

export const Markdown = ({ children }) => (
  <div className={styles.markdown}>
    <ReactMarkdown components={components} remarkPlugins={[gfm]}>
      {children}
    </ReactMarkdown>
  </div>
)

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
}
