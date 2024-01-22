FROM golang:1.21 as build

WORKDIR /app

COPY ./src ./

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o /clockmate-backend

FROM golang:1.21-alpine

WORKDIR /app

COPY --from=build /clockmate-backend /app/clockmate-backend

EXPOSE 8080

CMD ["/app/clockmate-backend"]