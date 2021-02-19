cd client

npm run build 

cd ..

cp -r ./client/build ./client-server



docker build -t haytchyt/alltunes-backend ./backend 

docker push haytchyt/alltunes-backend

docker build -t haytchyt/alltunes-room-service ./room-service

docker push haytchyt/alltunes-room-service

docker build -t haytchyt/alltunes-client-server ./client-server

docker push haytchyt/alltunes-client-server

kubectl apply -f ./kube