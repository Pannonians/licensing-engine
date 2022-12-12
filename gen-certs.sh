#!/usr/bin/env bash

mkcert licensing.localhost
cp licensing.localhost.pem proxy/certs/licensing.localhost.crt
cp licensing.localhost-key.pem proxy/certs/licensing.localhost.key
rm licensing.localhost.pem
rm licensing.localhost-key.pem
