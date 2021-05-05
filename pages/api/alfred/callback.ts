import { NextApiRequest, NextApiResponse } from 'next'
import { serialize, CookieSerializeOptions } from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { landing, user, session, token } = req.query

  const cookieParams: CookieSerializeOptions = {
    path: '/',
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 24 * 7
  }

  res.setHeader('Set-Cookie', [
    serialize('X-Alfred-Shop', user as string, cookieParams),
    serialize('X-Alfred-Token', token as string, cookieParams),
    serialize('X-Alfred-Session', session as string, cookieParams)
  ])

  if (landing === 'error') {
    res.redirect('/error')
  }

  if (landing === 'billing') {
    res.redirect('/plans')
  }

  res.redirect('/')
}