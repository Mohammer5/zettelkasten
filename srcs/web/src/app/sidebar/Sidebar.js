import { Menu, MenuItem } from '@dhis2/ui'
import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'
import { ToggleHidden } from './toggle-hidden'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  const history = useHistory()
  const [hidden, setHidden] = useState(true)
  const routeActiveTagCategories = !!useRouteMatch('/tagCategories')
  const routeActiveTags = !!useRouteMatch('/tags')
  const routeActiveZettels = !!useRouteMatch('/zettels')
  const routeActiveKastens = !!useRouteMatch('/kastens')

  const className = cx(styles.sidebar, { [styles.hidden]: hidden })

  return (
    <div className={className}>
      <ToggleHidden
        hidden={hidden}
        onToggle={() => setHidden(!hidden)}
      />

      <div className={styles.sidebarContents}>
        <Menu>
          <MenuItem
            active={routeActiveTagCategories}
            href="/tagCategories"
            onClick={() => history.push('/tagCategories')}
            label="Tag categories"
          />

          <MenuItem
            active={routeActiveTags}
            href="/tags"
            onClick={() => history.push('/tags')}
            label="Tags"
          />

          <MenuItem
            active={routeActiveZettels}
            href="/zettels"
            onClick={() => history.push('/zettels')}
            label="Zettels"
          />

          <MenuItem
            active={routeActiveKastens}
            href="/kastens"
            onClick={() => history.push('/kastens')}
            label="Kastens"
          />
        </Menu>
      </div>
    </div>
  )
}
